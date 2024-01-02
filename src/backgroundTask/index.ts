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
  IBackgroundTask,
  ISyncer,
  IDecoder,
  IStorager,
  IContext,
} from './interface';
import { delay } from '@unipackage/utils';

/**
 * BackgroundTask class implementing the IBackgroundTask interface.
 */
export class BackgroundTask implements IBackgroundTask {
  private context: IContext;
  private syncer: ISyncer;
  private decoder: IDecoder;
  private storager: IStorager;
  private needRunning: boolean;
  private syncHeight: number;

  /**
   * Constructor for the BackgroundTask class.
   * @param config - Configuration object containing necessary dependencies.
   */
  constructor(config: {
    context: IContext;
    syncer: ISyncer;
    decoder: IDecoder;
    storager: IStorager;
  }) {
    // Assign dependencies from the configuration
    this.syncer = config.syncer;
    this.decoder = config.decoder;
    this.storager = config.storager;
    this.context = config.context;

    // Initialize syncHeight using the startHeight from the chain configuration
    this.syncHeight = this.context.chain.startHeight;
  }

  /**
   * start the bg task.
   */
  async start() {
    this.needRunning = true;

    while (this.needRunning) {
      try {
        const chainHeadHeight = await this.syncer.getChainHeadHeight();
        const isHeightStored = await this.storager.isThisHeightStored(
          this.syncHeight,
        );
        if (!isHeightStored) {
          //step 1: sync the chain in this height
          const chainInfo = await this.syncer.getPendingChainInfo(
            this.syncHeight,
          );

          //step 2.1: decode the dataswapMessages from the chainInfo
          const dataswapMessages =
            this.decoder.getPendingDataswapMessages(chainInfo);

          //step 2.2: select the special params from the dataswapMessages
          const selectedParams =
            this.decoder.getPendingSelectedParams(dataswapMessages);
          console.log(selectedParams);

          //step 3.1 store selectedParams
          await this.storager.storeSelectedParams(selectedParams);

          //step 3.2 store dataswapMessages
          await this.storager.storeDataswapMessages(dataswapMessages);

          //step 3.3 store chainInfo
          await this.storager.storeChainInfo(chainInfo);
        } else if (this.syncHeight < chainHeadHeight) {
          this.syncHeight++;
        } else {
          delay(3000);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  /**
   * stop the bg task.
   */
  stop() {
    this.needRunning = false;
  }

  /**
   * Check if the bgTask is running.
   */
  isRunning(): boolean {
    return this.needRunning;
  }

  /**
   * get the current sync height
   */
  getCurrentSyncHeight(): number {
    return this.syncHeight;
  }

  /**
   * get the start height
   */
  getStartHeight(): number {
    return this.context.chain.startHeight;
  }
}
