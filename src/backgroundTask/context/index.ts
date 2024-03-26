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

import {
    TipsetMongoDatastore,
    BlockMongoDatastore,
    MessageMongoDatastore,
    ChainService,
    ChainFilecoinRPC,
    AddressesFilterReplayStrategy,
} from "@unipackage/filecoin"
import {
    IContext,
    ChainContext,
    EvmContext,
    DatastoreContext,
} from "../interface"
import {
    DataswapMessageMongoDatastore,
    DatasetMetadataMongoDatastore,
    DatasetRequirementMongoDatastore,
    DatasetProofMetadataMongoDatastore,
    DatasetChallengeMongoDatastore,
    CarMongoDatastore,
    MatchingMetadataMongoDatastore,
    MatchingTargetMongoDatastore,
    MatchingBidMongoDatastore,
    CarReplicaMongoDatastore,
    MemberMongoDatastore,
    DatasetsStatisticsMongoDatastore,
    MatchingsStatisticsMongoDatastore,
    MatchingStorageStatisticsInfoMongoDatastore,
    StoragesStatisticsMongoDatastore,
} from "@dataswapjs/dataswapjs"
import { getFilecoinAddress } from "../../shared/address"
import { DatabaseConnection } from "@unipackage/datastore"

/**
 * Configuration for a Context config.
 */
export interface Config {
    apiAddress: string
    token: string
    mongoUrl: string
    startHeight: number
    evm: EvmContext
    notRunSynctask: boolean
    network: string
    confidenceInterval: number
}

/**
 * Represents a connection to a Filecoin network.
 */
export class Context implements IContext {
    chain: ChainContext = {} as ChainContext
    evm: EvmContext = {} as EvmContext
    datastore: DatastoreContext = {} as DatastoreContext

    /**
     * Creates an instance of ChainNetwork.
     * @param config - The network configuration.
     */
    constructor(config: Config) {
        this.chain.confidenceInterval = config.confidenceInterval
        this.chain.network = config.network
        this.chain.startHeight = config.startHeight
        this.chain.notRunSynctask = config.notRunSynctask
        this.chain.rpc = new ChainFilecoinRPC({
            apiAddress: config.apiAddress,
            token: config.token,
        })
        this.datastore.baseConnection = DatabaseConnection.getInstance(
            config.mongoUrl
        )
        this.datastore.message = new MessageMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.block = new BlockMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.tipset = new TipsetMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.dataswapMessage = new DataswapMessageMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.datasetMetadata = new DatasetMetadataMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.car = new CarMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.datasetRequirement =
            new DatasetRequirementMongoDatastore(this.datastore.baseConnection)
        this.datastore.datasetProofMetadata =
            new DatasetProofMetadataMongoDatastore(
                this.datastore.baseConnection
            )
        this.datastore.datasetChallenge = new DatasetChallengeMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.member = new MemberMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.datasetStatistics = new DatasetsStatisticsMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.matchingMetadata = new MatchingMetadataMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.matchingTarget = new MatchingTargetMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.matchingBids = new MatchingBidMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.matchingsStatistics =
            new MatchingsStatisticsMongoDatastore(this.datastore.baseConnection)
        this.datastore.matchingStorageStatisticsInfo =
            new MatchingStorageStatisticsInfoMongoDatastore(
                this.datastore.baseConnection
            )
        this.datastore.storagesStatistics =
            new StoragesStatisticsMongoDatastore(this.datastore.baseConnection)

        this.datastore.carReplica = new CarReplicaMongoDatastore(
            this.datastore.baseConnection
        )
        this.datastore.datasetRequirement =
            new DatasetRequirementMongoDatastore(this.datastore.baseConnection)
        this.datastore.datasetProofMetadata =
            new DatasetProofMetadataMongoDatastore(
                this.datastore.baseConnection
            )
        this.datastore.matchingMetadata = new MatchingMetadataMongoDatastore(
            this.datastore.baseConnection
        )
        this.chain.service = new ChainService({
            rpc: this.chain.rpc,
            messageDs: this.datastore.message,
            blockMessagesDs: this.datastore.block,
            tipsetDs: this.datastore.tipset,
            replayStrategyOptions: {
                replay: true,
                replayStrategy: new AddressesFilterReplayStrategy([
                    getFilecoinAddress(
                        config.evm.datasetMetadata,
                        config.network
                    ),
                    getFilecoinAddress(
                        config.evm.datasetRequirement,
                        config.network
                    ),
                    getFilecoinAddress(config.evm.datasetProof, config.network),
                    getFilecoinAddress(
                        config.evm.datasetChallenge,
                        config.network
                    ),
                    getFilecoinAddress(
                        config.evm.matchingMetadata,
                        config.network
                    ),
                    getFilecoinAddress(
                        config.evm.matchingTarget,
                        config.network
                    ),
                    getFilecoinAddress(config.evm.matchingBids, config.network),
                    getFilecoinAddress(config.evm.storages, config.network),
                    getFilecoinAddress(config.evm.finance, config.network),
                    getFilecoinAddress(config.evm.roles, config.network),
                    getFilecoinAddress(config.evm.filplus, config.network),
                ]),
            },
        })

        this.evm.carstore = config.evm.carstore
        this.evm.roles = config.evm.roles
        this.evm.filplus = config.evm.filplus
        this.evm.finance = config.evm.finance
        this.evm.datasetMetadata = config.evm.datasetMetadata
        this.evm.datasetRequirement = config.evm.datasetRequirement
        this.evm.datasetProof = config.evm.datasetProof
        this.evm.datasetChallenge = config.evm.datasetChallenge
        this.evm.matchingMetadata = config.evm.matchingMetadata
        this.evm.matchingTarget = config.evm.matchingTarget
        this.evm.matchingBids = config.evm.matchingBids
        this.evm.storages = config.evm.storages
    }
}
