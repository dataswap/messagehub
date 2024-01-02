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

import { Chain } from '@unipackage/filecoin';
import { Context } from '../context';
import { ISyncer } from '../interface';

/**
 * Represents a connection to a Filecoin network.
 */
export class Syncer implements ISyncer {
  context: Context;
  /**
   * Creates an instance of ChainNetwork.
   * @param config - The network configuration.
   */
  constructor(context: Context) {
    this.context = context;
  }

  /**
   * Retrieves the current height of the Filecoin chain from the network.
   * @returns {Promise<number>} The height of the chain.
   * @throws {Error} If there is an error fetching the chain head height.
   */
  async getChainHeadHeight(): Promise<number> {
    const res = await this.context.chain.rpc.ChainHead();
    if (!res.ok) {
      throw new Error(`getChainHeadHeight error:${res.error}`);
    }
    return res.data.Height;
  }

  /**
   * Gets pending chain information.
   */
  async getPendingChainInfo(height: number): Promise<Chain> {
    const res = await this.context.chain.service.GetChainInfoByHeight(height);
    if (!res.ok) {
      throw new Error(res.error);
    }
    if (res.data.tipset.Height < height) {
      res.data = null as Chain;
    }
    return res.data;
  }
}
