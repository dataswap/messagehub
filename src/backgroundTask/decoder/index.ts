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

import { Chain } from "@unipackage/filecoin"
import { Context } from "../context"
import { IDecoder, SelectedParams } from "../interface"
import { DataswapMessage } from "@dataswapjs/dataswapjs"
import { selectedMethods } from "../interface/config"
import { getFilecoinAddress } from "../../shared/address"

/**
 * Represents a connection to a Filecoin network.
 */
export class Decoder implements IDecoder {
    context: Context
    /**
     * Creates an instance of ChainNetwork.
     * @param config - The network configuration.
     */
    constructor(context: Context) {
        this.context = context
    }

    /**
     * Gets pending dataswap messages based on the provided chain information.
     */
    getPendingDataswapMessages(pendingChainInfo: Chain): DataswapMessage[] {
        try {
            const res: DataswapMessage[] = []
            pendingChainInfo.messages.forEach((msg) => {
                switch (msg.Msg.To) {
                    case getFilecoinAddress(this.context.evm.datasetMetadata):
                        const datasetMetadata =
                            this.context.evm.datasetMetadata.decodeMessage(
                                msg
                            ).data
                        if (datasetMetadata) {
                            res.push(datasetMetadata)
                        } else {
                            console.error(
                                `Decode datasetMetadata error,:${datasetMetadata}`
                            )
                            throw new Error(
                                `Decode datasetMetadata error,:${datasetMetadata}`
                            )
                        }
                        break

                    case getFilecoinAddress(
                        this.context.evm.datasetRequirement
                    ):
                        const datasetRequirement =
                            this.context.evm.datasetRequirement.decodeMessage(
                                msg
                            ).data
                        if (datasetRequirement) {
                            res.push(datasetRequirement)
                        } else {
                            console.error(
                                `Decode datasetRequirement error,:${datasetRequirement}`
                            )
                            throw new Error(
                                `Decode datasetRequirement error,:${datasetRequirement}`
                            )
                        }
                        break

                    case getFilecoinAddress(this.context.evm.datasetProof):
                        const datasetProof =
                            this.context.evm.datasetProof.decodeMessage(
                                msg
                            ).data
                        if (datasetProof) {
                            res.push(datasetProof)
                        } else {
                            console.error(
                                `Decode datasetProof error,:${datasetProof}`
                            )
                            throw new Error(
                                `Decode datasetProof error,:${datasetProof}`
                            )
                        }
                        break

                    case getFilecoinAddress(this.context.evm.datasetChallenge):
                        const datasetChallenge =
                            this.context.evm.datasetChallenge.decodeMessage(
                                msg
                            ).data
                        if (datasetChallenge) {
                            res.push(datasetChallenge)
                        } else {
                            console.error(
                                `Decode datasetChallenge error,:${datasetChallenge}`
                            )
                            throw new Error(
                                `Decode datasetChallenge error,:${datasetChallenge}`
                            )
                        }
                        break

                    case getFilecoinAddress(this.context.evm.matchingMetadata):
                        const matchingMetadata =
                            this.context.evm.matchingMetadata.decodeMessage(
                                msg
                            ).data
                        if (matchingMetadata) {
                            res.push(matchingMetadata)
                        } else {
                            console.error(
                                `Decode matchingMetadata error,:${matchingMetadata}`
                            )
                            throw new Error(
                                `Decode matchingMetadata error,:${matchingMetadata}`
                            )
                        }
                        break

                    case getFilecoinAddress(this.context.evm.matchingTarget):
                        const matchingTarget =
                            this.context.evm.matchingTarget.decodeMessage(
                                msg
                            ).data
                        if (matchingTarget) {
                            res.push(matchingTarget)
                        } else {
                            console.error(
                                `Decode matchingTarget error,:${matchingTarget}`
                            )
                            throw new Error(
                                `Decode matchingTarget error,:${matchingTarget}`
                            )
                        }
                        break

                    case getFilecoinAddress(this.context.evm.matchingBids):
                        const matchingBids =
                            this.context.evm.matchingBids.decodeMessage(
                                msg
                            ).data
                        if (matchingBids) {
                            res.push(matchingBids)
                        } else {
                            console.error(
                                `Decode matchingBids error,:${matchingBids}`
                            )
                            throw new Error(
                                `Decode matchingBids error,:${matchingBids}`
                            )
                        }
                        break

                    case getFilecoinAddress(this.context.evm.storages):
                        const storages =
                            this.context.evm.storages.decodeMessage(msg).data
                        if (storages) {
                            res.push(storages)
                        } else {
                            console.error(`Decode storages error,:${storages}`)
                            throw new Error(
                                `Decode storages error,:${storages}`
                            )
                        }
                        break

                    case getFilecoinAddress(this.context.evm.datacaps):
                        const datacaps =
                            this.context.evm.datacaps.decodeMessage(msg).data
                        if (datacaps) {
                            res.push(datacaps)
                        } else {
                            console.error(`Decode datacaps error,:${datacaps}`)
                            throw new Error(
                                `Decode datacaps error,:${datacaps}`
                            )
                        }
                        break

                    case getFilecoinAddress(this.context.evm.roles):
                        const roles =
                            this.context.evm.roles.decodeMessage(msg).data
                        if (roles) {
                            res.push(roles)
                        } else {
                            console.error(`Decode roles error,:${roles}`)
                            throw new Error(`Decode roles error,:${roles}`)
                        }
                        break

                    case getFilecoinAddress(this.context.evm.filplus):
                        const filplus =
                            this.context.evm.filplus.decodeMessage(msg).data
                        if (filplus) {
                            res.push(filplus)
                        } else {
                            console.error(`Decode filplus error,:${filplus}`)
                            throw new Error(`Decode filplus error,:${filplus}`)
                        }
                        break

                    case getFilecoinAddress(this.context.evm.escrow):
                        const escrow =
                            this.context.evm.escrow.decodeMessage(msg).data
                        if (escrow) {
                            res.push(escrow)
                        } else {
                            console.error(`Decode escrow error,:${escrow}`)
                            throw new Error(`Decode escrow error,:${escrow}`)
                        }
                        break

                    default:
                        break
                }
            })
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    /**
     * Gets pending selected parameters from a list of dataswap messages.
     */
    getPendingSelectedParams(
        dataswapMessages: DataswapMessage[]
    ): SelectedParams[] {
        try {
            const selectedMsgs = dataswapMessages.filter((msg) =>
                selectedMethods.includes(msg.method)
            )

            const res = selectedMsgs.map((msg) => {
                return {
                    method: msg.method,
                    params: msg.params,
                } as SelectedParams
            })

            return res
        } catch (error) {
            throw new Error(error)
        }
    }
}
