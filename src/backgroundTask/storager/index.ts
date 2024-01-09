/*******************************************************************************
 *   (c) 2023 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

import { Context } from "../context"
import { IStorager, SelectedParams } from "../interface"
import { Chain } from "@unipackage/filecoin"
import {
    DatasetMetadata,
    DatasetProofMetadata,
    DatasetProofs,
    DatasetRequirements,
    DataswapMessage,
    MatchingMetadata,
    MatchingTarget,
    convertToCarArray,
    convertToCarReplicasArray,
    convertToRequirementArray,
    mergeMatchingTarget,
} from "@dataswapjs/dataswapjs"

/**
 * Represents a connection to a Filecoin network.
 */
export class Storager implements IStorager {
    context: Context
    /**
     * Creates an instance of ChainNetwork.
     * @param config - The network configuration.
     */
    constructor(context: Context) {
        this.context = context
    }

    /**
     * get latest synced height that is stored.
     */
    async getLatestSyncedHeight(): Promise<number> {
        const res = await this.context.datastore.tipset.find({
            page: 0,
            limit: 1,
            sort: [{ field: "Height", order: "desc" }],
        })
        if (!res.ok) {
            throw new Error(`getLatestSyncedHeight error:${res.error}`)
        }
        if (res.data && res.data.length > 0) {
            return res.data[0].Height
        } else {
            return 0
        }
    }

    /**
     * Checks if a given height has already been synchronized.
     * @param {number} height - The height to check for synchronization.
     * @returns {Promise<boolean>} True if the height is already synchronized, false otherwise.
     * @throws {Error} If there is an error checking the synchronization status.
     */
    async isThisHeightStored(height: number): Promise<boolean> {
        const syncedTipsetsRes = await this.context.datastore.tipset.find({
            conditions: [{ Height: height }],
        })
        if (!syncedTipsetsRes.ok) {
            throw new Error(
                `isHeightAlreadySynced error:${syncedTipsetsRes.error}`
            )
        }
        if (syncedTipsetsRes.data.length === 0) {
            return false
        } else {
            return true
        }
    }

    /**
     * Stores chain information.
     */
    async storeChainInfo(chain: Chain): Promise<void> {
        const res = await this.context.chain.service.SaveChainInfo(chain)
        if (!res.ok) {
            throw new Error(`storeChainInfo error:${res.error}`)
        }
    }

    /**
     * Stores an array of dataswap messages.
     */
    async storeDataswapMessages(
        dataswapMessages: Array<DataswapMessage>
    ): Promise<void> {
        try {
            const doStores = dataswapMessages.map(async (msg) =>
                this.context.datastore.dataswapMessage.CreateOrupdateByUniqueIndexes(
                    msg
                )
            )
            const res = await Promise.all(doStores)
            res.map((result) => {
                if (!result.ok)
                    throw new Error(
                        `storeDataswapMessages error_do_stores:${result.error}`
                    )
            })
        } catch (error) {
            throw new Error(`storeDataswapMessages error:${error}`)
        }
    }

    /**
     * Stores an array of selected parameters.
     */
    async storeSelectedParams(
        selectedParams: Array<SelectedParams>
    ): Promise<void> {
        try {
            const doStores = selectedParams.map(async (selected) => {
                switch (selected.method) {
                    case "submitDatasetMetadata":
                        return this.context.datastore.datasetMetadata.CreateOrupdateByUniqueIndexes(
                            selected.params as DatasetMetadata
                        )
                    case "submitDatasetReplicaRequirements":
                        const requirements = convertToRequirementArray(
                            selected.params as DatasetRequirements
                        )
                        for (let i = 0; i < requirements.length; i++) {
                            const ret =
                                await this.context.datastore.datasetRequirement.CreateOrupdateByUniqueIndexes(
                                    requirements[i]
                                )
                            if (!ret.ok) {
                                throw new Error(
                                    `storeSelectedParams-submitDatasetReplicaRequirements error:${ret.error}`
                                )
                            }
                        }
                        break
                    case "submitDatasetProofRoot":
                        return this.context.datastore.datasetProofMetadata.CreateOrupdateByUniqueIndexes(
                            selected.params as DatasetProofMetadata
                        )
                    case "submitDatasetProof":
                        const cars = await convertToCarArray({
                            carstorEvm: this.context.evm.carstore,
                            requirementEvm: this.context.evm.datasetRequirement,
                            proofs: selected.params as DatasetProofs,
                        })
                        for (let i = 0; i < cars.length; i++) {
                            const ret =
                                await this.context.datastore.car.CreateOrupdateByUniqueIndexes(
                                    cars[i]
                                )
                            if (!ret.ok) {
                                throw new Error(
                                    `storeSelectedParams-submitDatasetProof error:${ret.error}`
                                )
                            }
                        }
                        break
                    case "createMatching":
                        return this.context.datastore.matchingMetadata.CreateOrupdateByUniqueIndexes(
                            selected.params as MatchingMetadata
                        )
                    case "createTarget":
                        return this.context.datastore.matchingTarget.CreateOrupdateByUniqueIndexes(
                            selected.params as MatchingTarget
                        )
                    case "publishMatching":
                        const targetParam = selected.params as MatchingTarget
                        const carReplicas = await convertToCarReplicasArray({
                            carstorEvm: this.context.evm.carstore,
                            target: targetParam,
                        })
                        for (let i = 0; i < carReplicas.length; i++) {
                            const ret =
                                await this.context.datastore.carReplica.CreateOrupdateByUniqueIndexes(
                                    carReplicas[i]
                                )
                            if (!ret.ok) {
                                throw new Error(
                                    `storeSelectedParams-publishMatching error:${ret.error}`
                                )
                            }
                        }
                        const target =
                            await this.context.evm.matchingTarget.getMatchingTarget(
                                targetParam.matchingId
                            )
                        if (!target.ok) {
                            throw new Error(
                                `storeSelectedParams-getMatchingTarget error:${target.error}`
                            )
                        }
                        if (!target.data) {
                            throw new Error(
                                "storeSelectedParams-Get matchingtarget on chain failed"
                            )
                        }
                        this.context.datastore.matchingTarget.CreateOrupdateByUniqueIndexes(
                            target.data as MatchingTarget
                        )
                        break
                    default:
                        throw new Error(
                            "storeSelectedParams-Error selected method and params"
                        )
                }
            })
            const results = await Promise.all(doStores)
            results.forEach((res) => {
                if (!res.ok)
                    throw new Error(`storeSelectedParams error_1:${res.error}`)
            })
        } catch (error) {
            throw new Error(`storeSelectedParams error_2:${error}`)
        }
    }
}
