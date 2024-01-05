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
                        res.push(
                            this.context.evm.datasetMetadata.decodeMessage(msg)
                                .data
                        )
                        break

                    case getFilecoinAddress(
                        this.context.evm.datasetRequirement
                    ):
                        res.push(
                            this.context.evm.datasetRequirement.decodeMessage(
                                msg
                            ).data
                        )
                        break

                    case getFilecoinAddress(this.context.evm.datasetProof):
                        res.push(
                            this.context.evm.datasetProof.decodeMessage(msg)
                                .data
                        )
                        break

                    case getFilecoinAddress(this.context.evm.datasetChallenge):
                        res.push(
                            this.context.evm.datasetChallenge.decodeMessage(msg)
                                .data
                        )
                        break

                    case getFilecoinAddress(this.context.evm.matchingMetadata):
                        res.push(
                            this.context.evm.matchingMetadata.decodeMessage(msg)
                                .data
                        )
                        break

                    case getFilecoinAddress(this.context.evm.matchingTarget):
                        res.push(
                            this.context.evm.matchingTarget.decodeMessage(msg)
                                .data
                        )
                        break

                    case getFilecoinAddress(this.context.evm.matchingBids):
                        res.push(
                            this.context.evm.matchingBids.decodeMessage(msg)
                                .data
                        )
                        break

                    case getFilecoinAddress(this.context.evm.storages):
                        res.push(
                            this.context.evm.storages.decodeMessage(msg).data
                        )
                        break

                    case getFilecoinAddress(this.context.evm.datacaps):
                        res.push(
                            this.context.evm.datacaps.decodeMessage(msg).data
                        )
                        break

                    case getFilecoinAddress(this.context.evm.roles):
                        res.push(this.context.evm.roles.decodeMessage(msg).data)
                        break

                    case getFilecoinAddress(this.context.evm.filplus):
                        res.push(
                            this.context.evm.filplus.decodeMessage(msg).data
                        )
                        break

                    case getFilecoinAddress(this.context.evm.escrow):
                        res.push(
                            this.context.evm.escrow.decodeMessage(msg).data
                        )
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
