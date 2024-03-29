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
    DatasetMetadata,
    DatasetTimeoutParameters,
    DatasetRequirements,
    MatchingMetadata,
    MatchingTarget,
    MatchingBid,
    DatasetProofs,
    DatasetProofsWithhCarIds,
    DatasetProofMetadata,
    DatasetChallenge,
    BasicParamsInfo,
} from "@dataswapjs/dataswapjs"

/**
 * Selected methods available for processing.
 * @Note: you can add new method names.
 */
export const selectedDataStorageMethods = [
    "submitDatasetMetadata",
    "updateDatasetTimeoutParameters",
    "submitDatasetReplicaRequirements",
    "submitDatasetProofRoot",
    "submitDatasetProof",
    "submitDatasetProofWithCarIds",
    "submitDatasetProofCompleted",
    "submitDatasetChallengeProofs",
    "createMatching",
    "createTarget",
    "publishMatching",
    "pauseMatching",
    "resumeMatching",
    "bidding",
    "closeMatching",
    "cancelMatching",
    "submitStorageClaimIds",
    "requestAllocateDatacap",
]

/**
 * Map of selected methods to their corresponding parameter types.
 * @Note: you can add new prop,but the key of this object must be element of SelectedMethods.
 */
export type InternalSelectedDataStorageParamsMap = {
    submitDatasetMetadata: { params: DatasetMetadata } //Insert or update DatasetMetadata to datastore
    updateDatasetTimeoutParameters: { params: DatasetTimeoutParameters } //Update MatchiangMetadata to datastore
    submitDatasetReplicaRequirements: { params: DatasetRequirements } //Insert DatasetRequirment[] to datastore
    submitDatasetProofRoot: { params: DatasetProofMetadata } //Insert or update DatasetProofMetadata to datastore
    submitDatasetProof: { params: DatasetProofs } //Insert or update Car[] to datastore
    submitDatasetProofCompleted: { params: DatasetProofMetadata } // update DatasetState
    submitDatasetProofWithCarIds: { params: DatasetProofsWithhCarIds } //Insert or update Car[] to datastore
    submitDatasetChallengeProofs: { params: DatasetChallenge } //Insert DatasetChallenge to datastore
    createMatching: { params: MatchingMetadata } //Insert or update MatchiangMetadata to datastore
    createTarget: { params: MatchingTarget } // Insert MatchingTarget
    publishMatching: { params: MatchingTarget } //Update MatchiangTarget and insert CarReplica[] to datastore
    pauseMatching: { params: BasicParamsInfo } // Update MatchiangMetadata to datastore
    resumeMatching: { params: BasicParamsInfo } // Update MatchiangMetadata to datastore
    bidding: { params: MatchingBid } // Update MatchiangMetadata,Requirment to datastore
    closeMatching: { params: BasicParamsInfo } // Update matchings of requirment to datastore
    cancelMatching: { params: BasicParamsInfo } // Update matchings of requirment to datastore
    submitStorageClaimIds: { params: BasicParamsInfo } //update datastore for storage statistics infos
    requestAllocateDatacap: { params: BasicParamsInfo } // update datastore for matching storage statistics infos
}

/**
 * Selected state event methods available for processing.
 * @Note: you can add new method names.
 */
export const selectedStateEventMethods = [
    "submitDatasetReplicaRequirements",
    "submitDatasetProof",
    "submitDatasetProofWithCarIds",
    "completeEscrow",
    "submitDatasetProofCompleted",
    "pauseMatching",
    "resumeMatching",
    "publishMatching",
    "bidding",
    "cancelMatching",
    "closeMatching",
    //"submitStorageClaimIds",
]

/**
 * Map of selected state event methods to their corresponding parameter types.
 * @Note: you can add new prop,but the key of this object must be element of selectedStateEventMethods.
 */
export type InternalSelectedStateEventMethodsMap = {
    submitDatasetReplicaRequirements: { params: BasicParamsInfo } // update DatasetState
    submitDatasetProof: { params: BasicParamsInfo } // update DatasetState
    submitDatasetProofWithCarIds: { params: BasicParamsInfo } // update DatasetState
    completeEscrow: { params: BasicParamsInfo } // update DatasetState
    submitDatasetProofCompleted: { params: BasicParamsInfo } // update DatasetState
    pauseMatching: { params: BasicParamsInfo } // update MatchingState
    resumeMatching: { params: BasicParamsInfo } // update MatchingState
    publishMatching: { params: BasicParamsInfo } // update MatchingState
    bidding: { params: BasicParamsInfo } // update MatchingState & carReplica state
    cancelMatching: { params: BasicParamsInfo } // update MatchingState & carReplica state
    closeMatching: { params: BasicParamsInfo } // update MatchingState & carReplica state
    //submitStorageClaimIds: { params: StorageClaimIds } //update state for CarReplica
}
