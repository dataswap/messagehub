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
import {
    IStorager,
    SelectedDataStorageParams,
    SelectedStateEventParams,
} from "../interface"
import { Chain } from "@unipackage/filecoin"
import {
    DatasetMetadata,
    DatasetProofMetadata,
    DatasetProofs,
    DatasetProofsWithhCarIds,
    DatasetRequirements,
    DataswapMessage,
    MatchingMetadata,
    MatchingTarget,
    MatchingBid,
    convertToRequirementArray,
    BasicParamsInfo,
    DatasetChallenge,
    Member,
    FinanceAccount,
    FIL,
} from "@dataswapjs/dataswapjs"
import { Result } from "@unipackage/utils"

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
                this.context.datastore.dataswapMessage.CreateOrupdateByUniqueIndexesPlus(
                    {
                        matchingTarget: this.context.evm.matchingTarget,
                        data: msg,
                    }
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
     * Stores an array of selected data storage parameters.
     */
    async storeSelectedDataStorageParams(
        selectedParams: Array<SelectedDataStorageParams>,
        height: number
    ): Promise<void> {
        try {
            const doStores: Promise<Result<any>>[] = []

            selectedParams.map(async (selected) => {
                switch (selected.method) {
                    case "submitDatasetMetadata":
                        doStores.push(
                            this.context.datastore.datasetMetadata.storeDatasetMetadata(
                                {
                                    datasetMetadataEvm:
                                        this.context.evm.datasetMetadata,
                                    datasetMetadata:
                                        selected.params as DatasetMetadata,
                                    datasetId: selected.params.datasetId,
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.datasetBasicStatistics.updateBasicStatisticss(
                                {
                                    datasets: this.context.evm.datasetMetadata,
                                    height: BigInt(height),
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.member.createOrUpdateMember(
                                new Member({
                                    address: selected.params.submitter,
                                    totalDatasetsSubmitted: 1,
                                    totalProofSubmitted: 0,
                                    totalChallengeSubmitted: 0,
                                    totalMatchingSubmitted: 0,
                                    totalDisputeSubmitted: 0,
                                    storageClient: true,
                                    storageProvider: false,
                                    datasetPreparer: false,
                                    datasetAuditer: false,
                                    financeAccounts: [
                                        new FinanceAccount({
                                            datasetId:
                                                selected.params.datasetId,
                                            matchingId: 0,
                                            token: FIL,
                                        }),
                                    ],
                                })
                            )
                        )
                        break
                    case "updateDatasetTimeoutParameters":
                        doStores.push(
                            this.context.datastore.datasetMetadata.updateDatasetTimeoutParameters(
                                {
                                    datasetMetadataEvm:
                                        this.context.evm.datasetMetadata,
                                    datasetId: selected.params.datasetId,
                                }
                            )
                        )

                        break
                    case "submitDatasetReplicaRequirements":
                        const requirements = convertToRequirementArray(
                            selected.params as DatasetRequirements
                        )
                        for (let i = 0; i < requirements.length; i++) {
                            doStores.push(
                                this.context.datastore.datasetRequirement.CreateOrupdateByUniqueIndexes(
                                    requirements[i]
                                )
                            )
                        }
                        break

                    case "submitDatasetProofRoot":
                        doStores.push(
                            this.context.datastore.datasetProofMetadata.CreateOrupdateByUniqueIndexes(
                                selected.params as DatasetProofMetadata
                            )
                        )

                        doStores.push(
                            this.context.datastore.member.createOrUpdateMember(
                                new Member({
                                    address: selected.params.submitter,
                                    totalDatasetsSubmitted: 0,
                                    totalProofSubmitted: 1,
                                    totalChallengeSubmitted: 0,
                                    totalMatchingSubmitted: 0,
                                    totalDisputeSubmitted: 0,
                                    storageClient: false,
                                    storageProvider: false,
                                    datasetPreparer: true,
                                    datasetAuditer: false,
                                    financeAccounts: [
                                        new FinanceAccount({
                                            datasetId:
                                                selected.params.datasetId,
                                            matchingId: 0,
                                            token: FIL,
                                        }),
                                    ],
                                })
                            )
                        )

                        break

                    case "submitDatasetProof":
                        doStores.push(
                            this.context.datastore.car.storeCars({
                                carstoreEvm: this.context.evm.carstore,
                                requirementEvm:
                                    this.context.evm.datasetRequirement,
                                proofs: selected.params as DatasetProofs,
                            })
                        )
                        doStores.push(
                            this.context.datastore.datasetBasicStatistics.updateBasicStatisticss(
                                {
                                    datasets: this.context.evm.datasetMetadata,
                                    height: BigInt(height),
                                }
                            )
                        )
                        break
                    case "submitDatasetProofWithCarIds":
                        doStores.push(
                            this.context.datastore.car.storeCarsWithCarIds({
                                carstoreEvm: this.context.evm.carstore,
                                requirementEvm:
                                    this.context.evm.datasetRequirement,
                                proofs: selected.params as DatasetProofsWithhCarIds,
                            })
                        )
                        doStores.push(
                            this.context.datastore.datasetBasicStatistics.updateBasicStatisticss(
                                {
                                    datasets: this.context.evm.datasetMetadata,
                                    height: BigInt(height),
                                }
                            )
                        )
                        break
                    case "submitDatasetProofCompleted":
                        doStores.push(
                            this.context.datastore.datasetProofMetadata.updateDatasetSize(
                                {
                                    datasetProofEvm:
                                        this.context.evm.datasetProof,
                                    datasetId: selected.params.datasetId,
                                }
                            )
                        )

                        doStores.push(
                            this.context.datastore.datasetBasicStatistics.updateBasicStatisticss(
                                {
                                    datasets: this.context.evm.datasetMetadata,
                                    height: BigInt(height),
                                }
                            )
                        )
                        break
                    case "submitDatasetChallengeProofs":
                        doStores.push(
                            this.context.datastore.datasetChallenge.CreateOrupdateByUniqueIndexes(
                                selected.params as DatasetChallenge
                            )
                        )

                        doStores.push(
                            this.context.datastore.member.createOrUpdateMember(
                                new Member({
                                    address: selected.params.auditor,
                                    totalDatasetsSubmitted: 0,
                                    totalProofSubmitted: 0,
                                    totalChallengeSubmitted: 1,
                                    totalMatchingSubmitted: 0,
                                    totalDisputeSubmitted: 0,
                                    storageClient: false,
                                    storageProvider: false,
                                    datasetPreparer: false,
                                    datasetAuditer: true,
                                    financeAccounts: [
                                        new FinanceAccount({
                                            datasetId:
                                                selected.params.datasetId,
                                            matchingId: 0,
                                            token: FIL,
                                        }),
                                    ],
                                })
                            )
                        )

                        doStores.push(
                            this.context.datastore.datasetMetadata.updateDatasetChallengeCommissionPrice(
                                {
                                    financeEvm: this.context.evm.finance,
                                    datasetMetadataEvm:
                                        this.context.evm.datasetMetadata,
                                    datasetChallengeEvm:
                                        this.context.evm.datasetChallenge,
                                    datasetId: selected.params.datasetId,
                                    token: FIL,
                                    height: BigInt(height),
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.datasetBasicStatistics.updateBasicStatisticss(
                                {
                                    datasets: this.context.evm.datasetMetadata,
                                    height: BigInt(height),
                                }
                            )
                        )
                        break
                    case "createMatching":
                        doStores.push(
                            this.context.datastore.matchingMetadata.storeWithOrigionMatchingMetadata(
                                {
                                    matchingMetadata:
                                        this.context.evm.matchingMetadata,
                                    datasetRequirement:
                                        this.context.evm.datasetRequirement,
                                    origionMetadata:
                                        selected.params as MatchingMetadata,
                                    matchingId: selected.params.matchingId,
                                }
                            )
                        )

                        doStores.push(
                            this.context.datastore.member.createOrUpdateMember(
                                new Member({
                                    address: selected.params.initiator,
                                    totalDatasetsSubmitted: 0,
                                    totalProofSubmitted: 0,
                                    totalChallengeSubmitted: 0,
                                    totalMatchingSubmitted: 1,
                                    totalDisputeSubmitted: 0,
                                    storageClient: false,
                                    storageProvider: false,
                                    datasetPreparer: true,
                                    datasetAuditer: false,
                                    financeAccounts: [
                                        new FinanceAccount({
                                            datasetId:
                                                selected.params.datasetId,
                                            matchingId:
                                                selected.params.matchingId,
                                            token: FIL,
                                        }),
                                    ],
                                })
                            )
                        )
                        doStores.push(
                            this.context.datastore.matchingsBasicStatistics.updateBasicStatisticss(
                                {
                                    matchings:
                                        this.context.evm.matchingMetadata,
                                    height: BigInt(height),
                                }
                            )
                        )
                        break

                    case "createTarget":
                        doStores.push(
                            this.context.datastore.matchingTarget.CreateOrupdateByUniqueIndexes(
                                selected.params as MatchingTarget
                            )
                        )
                        doStores.push(
                            this.context.datastore.datasetRequirement.addMatching(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    matchingMetadata:
                                        this.context.evm.matchingMetadata,
                                    matchingId: selected.params.matchingId,
                                }
                            )
                        )
                        break

                    case "publishMatching":
                        const target = selected.params as MatchingTarget
                        doStores.push(
                            this.context.datastore.carReplica.storeCarReplicas({
                                matchingTarget: this.context.evm.matchingTarget,
                                target: selected.params as MatchingTarget,
                            })
                        )
                        for (let i = 0; i < target.cars.length; i++) {
                            doStores.push(
                                this.context.datastore.car.updateReplica({
                                    carstore: this.context.evm.carstore,
                                    carId: BigInt(target.cars[i]),
                                    matchingId: target.matchingId,
                                    replicaIndex: target.replicaIndex,
                                })
                            )
                        }
                        doStores.push(
                            this.context.datastore.matchingTarget.storeMatchingtarget(
                                {
                                    matchingTargetEvm:
                                        this.context.evm.matchingTarget,
                                    target: selected.params as MatchingTarget,
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.matchingMetadata.updateMatchingTargetInfo(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    matchingId: selected.params.matchingId,
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.datasetRequirement.updateMatching(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    storages: this.context.evm.storages,
                                    matchingId: selected.params.matchingId,
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.matchingsBasicStatistics.updateBasicStatisticss(
                                {
                                    matchings:
                                        this.context.evm.matchingMetadata,
                                    height: BigInt(height),
                                }
                            )
                        )

                        break
                    case "bidding":
                        doStores.push(
                            this.context.datastore.matchingBids.storeMatchingBid(
                                {
                                    matchingBids: this.context.evm.matchingBids,
                                    origionMatchingBid:
                                        selected.params as MatchingBid,
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.datasetRequirement.updateMatching(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    storages: this.context.evm.storages,
                                    matchingId: selected.params.matchingId,
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.matchingMetadata.updateMatchingWinner(
                                {
                                    matchingBids: this.context.evm.matchingBids,
                                    matchingId: (selected.params as MatchingBid)
                                        .matchingId,
                                }
                            )
                        )

                        doStores.push(
                            this.context.datastore.matchingStorageStatisticsInfo.updateMatchingStorageStatisticsInfos(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    storages: this.context.evm.storages,
                                    matchingId: (selected.params as MatchingBid)
                                        .matchingId,
                                }
                            )
                        )

                        doStores.push(
                            this.context.datastore.storagesBasicStatistics.updateBasicStatisticss(
                                {
                                    storages: this.context.evm.storages,
                                    height: BigInt(height),
                                }
                            )
                        )

                        doStores.push(
                            this.context.datastore.member.createOrUpdateMember({
                                matchingTarget: this.context.evm.matchingTarget,
                                update: new Member({
                                    address: selected.params.bidder,
                                    totalDatasetsSubmitted: 0,
                                    totalProofSubmitted: 0,
                                    totalChallengeSubmitted: 0,
                                    totalMatchingSubmitted: 0,
                                    totalDisputeSubmitted: 0,
                                    storageClient: true,
                                    storageProvider: false,
                                    datasetPreparer: false,
                                    datasetAuditer: false,
                                    financeAccounts: [
                                        new FinanceAccount({
                                            datasetId: 0,
                                            matchingId:
                                                selected.params.matchingId,
                                            token: FIL,
                                        }),
                                    ],
                                }),
                            })
                        )
                        doStores.push(
                            this.context.datastore.matchingsBasicStatistics.updateBasicStatisticss(
                                {
                                    matchings:
                                        this.context.evm.matchingMetadata,
                                    height: BigInt(height),
                                }
                            )
                        )

                    case "pauseMatching":
                    case "resumeMatching":
                        doStores.push(
                            this.context.datastore.matchingMetadata.updateMatchingBiddingInfo(
                                {
                                    matchingMetadata:
                                        this.context.evm.matchingMetadata,
                                    matchingBids: this.context.evm.matchingBids,
                                    matchingId: selected.params.matchingId,
                                }
                            )
                        )

                        break
                    case "closeMatching":
                        doStores.push(
                            this.context.datastore.matchingMetadata.updateMatchingWinner(
                                {
                                    matchingBids: this.context.evm.matchingBids,
                                    matchingId: (
                                        selected.params as BasicParamsInfo
                                    ).matchingId,
                                }
                            )
                        )

                        doStores.push(
                            this.context.datastore.matchingStorageStatisticsInfo.updateMatchingStorageStatisticsInfos(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    storages: this.context.evm.storages,
                                    matchingId: (
                                        selected.params as BasicParamsInfo
                                    ).matchingId,
                                }
                            )
                        )

                        doStores.push(
                            this.context.datastore.storagesBasicStatistics.updateBasicStatisticss(
                                {
                                    storages: this.context.evm.storages,
                                    height: BigInt(height),
                                }
                            )
                        )

                    case "cancelMatching":
                        doStores.push(
                            this.context.datastore.datasetRequirement.updateMatching(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    storages: this.context.evm.storages,
                                    matchingId: selected.params.matchingId,
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.matchingsBasicStatistics.updateBasicStatisticss(
                                {
                                    matchings:
                                        this.context.evm.matchingMetadata,
                                    height: BigInt(height),
                                }
                            )
                        )

                        break
                    case "submitStorageClaimIds":
                        doStores.push(
                            this.context.datastore.storagesBasicStatistics.updateBasicStatisticss(
                                {
                                    storages: this.context.evm.storages,
                                    height: BigInt(height),
                                }
                            )
                        )
                    case "requestAllocateDatacap":
                        doStores.push(
                            this.context.datastore.matchingStorageStatisticsInfo.updateMatchingStorageStatisticsInfos(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    storages: this.context.evm.storages,
                                    matchingId: (
                                        selected.params as BasicParamsInfo
                                    ).matchingId,
                                }
                            )
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

    /**
     * Stores an array of selected state event parameters.
     */
    async processSelectedStateEventParams(
        selectedParams: Array<SelectedStateEventParams>
    ): Promise<void> {
        try {
            const doStores: Promise<Result<any>>[] = []

            selectedParams.map(async (selected) => {
                switch (selected.method) {
                    case "submitDatasetReplicaRequirements":
                    case "submitDatasetProof":
                    case "completeEscrow":
                    case "submitDatasetProofCompleted":
                        const param = selected.params as BasicParamsInfo
                        doStores.push(
                            this.context.datastore.datasetMetadata.updateDatasetMetadataState(
                                {
                                    datasetMetadataEvm:
                                        this.context.evm.datasetMetadata,
                                    datasetId: param.datasetId!,
                                }
                            )
                        )
                        break
                    case "bidding":
                    case "cancelMatching":
                    case "closeMatching":
                        doStores.push(
                            this.context.datastore.car.updateAllReplicasStateOfMatching(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    carstore: this.context.evm.carstore,
                                    matchingId: (
                                        selected.params as BasicParamsInfo
                                    ).matchingId,
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.carReplica.updateAllStatesOfMatching(
                                {
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    carstore: this.context.evm.carstore,
                                    matchingId: selected.params.matchingId,
                                }
                            )
                        )
                    case "pauseMatching":
                    case "resumeMatching":
                    case "publishMatching":
                        doStores.push(
                            this.context.datastore.matchingMetadata.updateMatchingState(
                                {
                                    matchingMetadata:
                                        this.context.evm.matchingMetadata,
                                    matchingId: (
                                        selected.params as BasicParamsInfo
                                    ).matchingId,
                                }
                            )
                        )
                        doStores.push(
                            this.context.datastore.datasetRequirement.updateMatchingState(
                                {
                                    matchingMetadata:
                                        this.context.evm.matchingMetadata,
                                    matchingTarget:
                                        this.context.evm.matchingTarget,
                                    matchingId: (
                                        selected.params as BasicParamsInfo
                                    ).matchingId,
                                }
                            )
                        )
                        break
                    default:
                        throw new Error(
                            "storeSelectedStateEventParams-Error selected method and params"
                        )
                }
            })
            const results = await Promise.all(doStores)
            results.forEach((res) => {
                if (!res.ok)
                    throw new Error(
                        `storeSelectedStateEventParams error_1:${res.error}`
                    )
            })
        } catch (error) {
            throw new Error(`storeSelectedStateEventParams error_2:${error}`)
        }
    }
}
