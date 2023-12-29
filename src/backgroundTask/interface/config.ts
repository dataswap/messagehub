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

import { DatasetMetadata, DatasetRequirement } from '@dataswapjs/dataswapjs';

/**
 * Selected methods available for processing.
 * @Note: you can add new method names.
 */
export const SelectedMethods = [
  'submitDatasetMetadata',
  'submitDatasetReplicaRequirements',
] as const;

/**
 * Map of selected methods to their corresponding parameter types.
 * @Note: you can add new prop,but the key of this object must be element of SelectedMethods.
 */
export type InternalSelectedParamsMap = {
  submitDatasetMetadata: { params: DatasetMetadata };
  submitDatasetReplicaRequirements: { params: Array<DatasetRequirement> };
};
