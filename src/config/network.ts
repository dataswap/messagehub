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
} from '@unipackage/filecoin';

export interface NetworkConfig {
  apiAddress: string;
  token: string;
  mongoUrl: string;
  dataswapStartHeight: number;
  contractAddress?: {
    dataset: string;
  };
}

export class ChainNetwork {
  rpc: ChainFilecoinRPC;
  messageDatastore: MessageMongoDatastore;
  blockDatastore: BlockMongoDatastore;
  tipsetDatastore: TipsetMongoDatastore;
  dataswapStartHeight: number;
  chainService: ChainService;

  constructor(config: NetworkConfig) {
    this.dataswapStartHeight = config.dataswapStartHeight;
    this.rpc = new ChainFilecoinRPC({
      apiAddress: config.apiAddress,
      token: config.token,
    });
    this.messageDatastore = new MessageMongoDatastore(config.mongoUrl);
    this.blockDatastore = new BlockMongoDatastore(config.mongoUrl);
    this.tipsetDatastore = new TipsetMongoDatastore(config.mongoUrl);
    this.chainService = new ChainService({
      rpc: this.rpc,
      messageDs: this.messageDatastore,
      blockMessagesDs: this.blockDatastore,
      tipsetDs: this.tipsetDatastore,
      replayStrategyOptions: {
        replay: false,
        replayStrategy: new AddressesFilterReplayStrategy([]),
      },
    });
  }
}

export const chainNetworkCalibration = new ChainNetwork({
  apiAddress: process.env.CALIBRATION_LOTUS_API_ENDPOINT as string,
  token: process.env.CALIBRATION_LOTUS_TOKEN as string,
  mongoUrl: process.env.CALIBRATION_MONGO_URL as string,
  dataswapStartHeight: 1,
});

export const chainNetwork = new ChainNetwork({
  apiAddress: process.env.MAIN_LOTUS_API_ENDPOINT as string,
  token: process.env.MAIN_LOTUS_TOKEN as string,
  mongoUrl: process.env.MAIN_MONGO_URL as string,
  dataswapStartHeight: 1,
});
