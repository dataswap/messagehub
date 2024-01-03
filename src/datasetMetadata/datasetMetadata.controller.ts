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

import { Controller, Post, Body } from '@nestjs/common';
import { DatasetMetadataService } from './datasetMetadata.service';
import { QueryFilter } from '@unipackage/datastore';
import { DatasetMetadata } from '@dataswapjs/dataswapjs';
import { ValueFields, Result } from '@unipackage/utils';

/**
 * Controller responsible for handling root-level requests.
 */
@Controller('datasetmetadata')
export class DatasetMetadataController {
  /**
   * Creates an instance of RootController.
   * @param rootService - The RootService instance.
   */
  constructor(
    private readonly datasetMetadataService: DatasetMetadataService,
  ) {}

  /**
   * Handles GET requests for root-level resources with an identifier.
   * @param queryFilter - Request parameters.
   * @returns A string representing the response.
   * @example
   * {
   * "conditions": [
   *   {
   *    "datasetId": { "$gt": 0, "$lt": 3}
   *   }
   *  ]
   * }
   */
  @Post('query')
  async find(
    @Body() queryFilter: QueryFilter<ValueFields<DatasetMetadata>>,
  ): Promise<Result<ValueFields<DatasetMetadata>[]>> {
    return await this.datasetMetadataService.find(queryFilter);
  }
}
