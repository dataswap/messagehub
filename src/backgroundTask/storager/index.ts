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

import { Context } from '../context';
import { IStorager, SelectedParams } from '../interface';
import { Chain } from '@unipackage/filecoin';
import { DatasetMetadata, DataswapMessage } from '@dataswapjs/dataswapjs';

/**
 * Represents a connection to a Filecoin network.
 */
export class Storager implements IStorager {
  context: Context;
  /**
   * Creates an instance of ChainNetwork.
   * @param config - The network configuration.
   */
  constructor(context: Context) {
    this.context = context;
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
    });
    if (!syncedTipsetsRes.ok) {
      throw new Error(`isHeightAlreadySynced error:${syncedTipsetsRes.error}`);
    }
    if (syncedTipsetsRes.data.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Stores chain information.
   */
  async storeChainInfo(chain: Chain): Promise<void> {
    const res = await this.context.chain.service.SaveChainInfo(chain);
    if (!res.ok) {
      throw new Error(res.error);
    }
  }

  /**
   * Stores an array of dataswap messages.
   */
  async storeDataswapMessages(
    dataswapMessages: Array<DataswapMessage>,
  ): Promise<void> {
    try {
      const doStores = dataswapMessages.map(async (msg) =>
        this.context.datastore.dataswapMessage.CreateOrupdateByUniqueIndexes(
          msg,
        ),
      );
      const res = await Promise.all(doStores);
      res.map((result) => {
        if (!result.ok) throw new Error(result.error);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Stores an array of selected parameters.
   */
  async storeSelectedParams(
    selectedParams: Array<SelectedParams>,
  ): Promise<void> {
    try {
      const doStores = selectedParams.map(async (selected) => {
        switch (selected.method) {
          case 'submitDatasetMetadata':
            return this.context.datastore.datasetMetadata.CreateOrupdateByUniqueIndexes(
              selected.params as DatasetMetadata,
            );
          case 'submitDatasetReplicaRequirements':
            throw new Error('not implement');
          //TODO: add other methods
          default:
            throw new Error('Error selected method and params');
        }
      });
      const results = await Promise.all(doStores);
      results.forEach((res) => {
        if (!res.ok) throw new Error(res.error);
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
