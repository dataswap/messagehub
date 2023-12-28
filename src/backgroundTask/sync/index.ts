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

/**
 * Represents a connection to a Filecoin network.
 */
export class Syncer {
  context: Context;
  /**
   * Creates an instance of ChainNetwork.
   * @param config - The network configuration.
   */
  constructor(context: Context) {
    this.context = context;
  }

  /**
   * Utility function to introduce a delay.
   * @param ms - The delay time in milliseconds.
   */
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Retrieves the current height of the Filecoin chain from the network.
   * @returns {Promise<number>} The height of the chain.
   * @throws {Error} If there is an error fetching the chain head height.
   */
  async getChainHeadHeight(): Promise<number> {
    const res = await this.context.rpc.ChainHead();
    if (!res.ok) {
      throw new Error(`getChainHeadHeight error:${res.error}`);
    }
    return res.data.Height;
  }

  /**
   * Checks if a given height has already been synchronized.
   * @param {number} height - The height to check for synchronization.
   * @returns {Promise<boolean>} True if the height is already synchronized, false otherwise.
   * @throws {Error} If there is an error checking the synchronization status.
   */
  async isHeightAlreadySynced(height: number): Promise<boolean> {
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
   * Initiates a background task to synchronize the chain starting from the configured height.
   * This task runs indefinitely, periodically fetching and saving chain information.
   * @throws {Error} If there is an error during the synchronization process.
   */
  async startSyncBackgroundTask() {
    let syncHeight = this.context.startHeight;

    while (true) {
      const chainHeadHeight = await this.getChainHeadHeight();
      const isSynced = await this.isHeightAlreadySynced(syncHeight);
      if (!isSynced) {
        await this.context.chainService.GetAndSaveChainInfoByHeight(syncHeight);
      } else if (syncHeight < chainHeadHeight) {
        syncHeight++;
      } else {
        await this.delay(3000);
      }
    }
  }
}
