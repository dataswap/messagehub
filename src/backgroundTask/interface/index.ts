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
    Chain,
    ChainService,
    ChainFilecoinRPC,
} from "@unipackage/filecoin"
import {
    DatasetMetadataEvm,
    DatasetProofEvm,
    DatasetRequirementEvm,
    DatasetChallengeEvm,
    MatchingBidsEvm,
    MatchingMetadataEvm,
    MatchingTargetEvm,
    StoragesEvm,
    DatacapsEvm,
    EscrowEvm,
    RolesEvm,
    FilplusEvm,
    DataswapMessage,
    DataswapMessageMongoDatastore,
    DatasetMetadataMongoDatastore,
    CarMongoDatastore,
    CarReplicaMongoDatastore,
    DatasetRequirementMongoDatastore,
    DatasetProofMetadataMongoDatastore,
    MatchingMetadataMongoDatastore,
} from "@dataswapjs/dataswapjs"
import { InternalSelectedParamsMap } from "./config"
import { DatabaseConnection } from "@unipackage/datastore"

/**
 * Configuration for Chain context.
 */
export interface ChainContext {
    rpc: ChainFilecoinRPC
    service: ChainService
    startHeight: number
}

/**
 * Configuration for Evm context.
 */
export interface EvmContext {
    escrow: EscrowEvm
    filplus: FilplusEvm
    roles: RolesEvm
    datasetMetadata: DatasetMetadataEvm
    datasetRequirement: DatasetRequirementEvm
    datasetProof: DatasetProofEvm
    datasetChallenge: DatasetChallengeEvm
    matchingTarget: MatchingTargetEvm
    matchingMetadata: MatchingMetadataEvm
    matchingBids: MatchingBidsEvm
    storages: StoragesEvm
    datacaps: DatacapsEvm
}

/**
 * Configuration for Datastore context.
 */
export interface DatastoreContext {
    baseConnection: DatabaseConnection
    message: MessageMongoDatastore
    block: BlockMongoDatastore
    tipset: TipsetMongoDatastore
    dataswapMessage: DataswapMessageMongoDatastore
    datasetMetadata: DatasetMetadataMongoDatastore
    car: CarMongoDatastore
    carReplica: CarReplicaMongoDatastore
    datasetRequirement: DatasetRequirementMongoDatastore
    datasetProofMetadata: DatasetProofMetadataMongoDatastore
    matchingMetadata: MatchingMetadataMongoDatastore
}

/**
 * Configuration for IContext.
 */
export interface IContext {
    chain: ChainContext
    datastore: DatastoreContext
    evm: EvmContext
}

/**
 * Union type of selected method names.
 */
type InternalSelectedMethod = keyof InternalSelectedParamsMap

/**
 * Type representing selected methods and their associated parameters.
 */
export type SelectedParams = {
    [K in InternalSelectedMethod]: {
        method: K
        params: InternalSelectedParamsMap[K]["params"]
    }
}[InternalSelectedMethod]

/**
 * Interface for the Syncer, responsible for interacting with the blockchain.
 */
export interface ISyncer {
    /**
     * Gets the height of the current chain head.
     */
    getChainHeadHeight(): Promise<number>

    /**
     * Gets pending chain information.
     */
    getPendingChainInfo(height: number): Promise<Chain>
}

/**
 * Interface for the Decoder, responsible for decoding dataswap messages.
 */
export interface IDecoder {
    /**
     * Gets pending dataswap messages based on the provided chain information.
     */
    getPendingDataswapMessages(pendingChainInfo: Chain): Array<DataswapMessage>

    /**
     * Gets pending selected parameters from a list of dataswap messages.
     */
    getPendingSelectedParams(
        dataswapMessages: Array<DataswapMessage>
    ): Array<SelectedParams>
}

/**
 * Interface for the Storager, responsible for storing blockchain-related data.
 */
export interface IStorager {
    /**
     * get latest synced height that is stored.
     */
    getLatestSyncedHeight(): Promise<number>

    /**
     * Checks if data for the specified height is stored.
     */
    isThisHeightStored(height: number): Promise<boolean>

    /**
     * Stores chain information.
     */
    storeChainInfo(chain: Chain): void

    /**
     * Stores an array of dataswap messages.
     */
    storeDataswapMessages(dataswapMessages: Array<DataswapMessage>): void

    /**
     * Stores an array of selected parameters.
     */
    storeSelectedParams(selectedParams: Array<SelectedParams>): void
}

/**
 * Interface for the BackgroundTask, representing a background task that can be started and stopped.
 */
export interface IBackgroundTask {
    /**
     * Starts the background task.
     */
    start(): void

    /**
     * Stops the background task.
     */
    stop(): void

    /**
     * Check if the bgTask is running.
     */
    isRunning(): boolean

    /**
     * get the current sync height
     */
    getCurrentSyncHeight(): number

    /**
     * get the start height
     */
    getStartHeight(): number
}
