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
    DatasetRequirements,
    MatchingMetadata,
    MatchingTarget,
    DatasetProofs,
    DatasetProofMetadata,
} from "@dataswapjs/dataswapjs"

/**
 * Selected methods available for processing.
 * @Note: you can add new method names.
 */
export const selectedMethods = [
    "submitDatasetMetadata",
    "submitDatasetReplicaRequirements",
    "submitDatasetProofRoot",
    "submitDatasetProof",
    "createMatching",
    "createTarget",
    "publishMatching",
    //"submitStorageClaimIds",
]

/**
 * Map of selected methods to their corresponding parameter types.
 * @Note: you can add new prop,but the key of this object must be element of SelectedMethods.
 */
export type InternalSelectedParamsMap = {
    submitDatasetMetadata: { params: DatasetMetadata } //Insert or update DatasetMetadata to datastore
    submitDatasetReplicaRequirements: { params: DatasetRequirements } //Insert DatasetRequirment[] to datastore
    submitDatasetProofRoot: { params: DatasetProofMetadata } //Insert or update DatasetProofMetadata to datastore
    submitDatasetProof: { params: DatasetProofs } //Insert or update Car[] to datastore
    createMatching: { params: MatchingMetadata } //Insert or update MatchiangMetadata to datastore
    createTarget: { params: MatchingTarget } // Insert MatchingTarget
    publishMatching: { params: MatchingTarget } //Update MatchiangTarget and insert CarReplica[] to datastore
    //submitStorageClaimIds: { params: StorageClaimIds } //update datastore for CarReplica
}
