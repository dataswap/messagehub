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
import {
  IContext,
  ChainContext,
  EvmContext,
  DatastoreContext,
} from '../interface';
import {
  DataswapMessageMongoDatastore,
  DatasetMetadataMongoDatastore,
} from '@dataswapjs/dataswapjs';
import { getFilecoinAddress } from '../../shared/address';

/**
 * Configuration for a Context config.
 */
export interface Config {
  apiAddress: string;
  token: string;
  mongoUrl: string;
  startHeight: number;
  evm: EvmContext;
}

/**
 * Represents a connection to a Filecoin network.
 */
export class Context implements IContext {
  chain: ChainContext = {} as ChainContext;
  evm: EvmContext = {} as EvmContext;
  datastore: DatastoreContext = {} as DatastoreContext;

  /**
   * Creates an instance of ChainNetwork.
   * @param config - The network configuration.
   */
  constructor(config: Config) {
    this.chain.startHeight = config.startHeight;
    this.chain.rpc = new ChainFilecoinRPC({
      apiAddress: config.apiAddress,
      token: config.token,
    });
    this.datastore.message = new MessageMongoDatastore(config.mongoUrl);
    this.datastore.block = new BlockMongoDatastore(config.mongoUrl);
    this.datastore.tipset = new TipsetMongoDatastore(config.mongoUrl);
    this.datastore.dataswapMessage = new DataswapMessageMongoDatastore(
      config.mongoUrl,
    );
    this.datastore.datasetMetadata = new DatasetMetadataMongoDatastore(
      config.mongoUrl,
    );
    this.chain.service = new ChainService({
      rpc: this.chain.rpc,
      messageDs: this.datastore.message,
      blockMessagesDs: this.datastore.block,
      tipsetDs: this.datastore.tipset,
      replayStrategyOptions: {
        replay: true,
        //TODO:add all evm address
        replayStrategy: new AddressesFilterReplayStrategy([
          getFilecoinAddress(config.evm.datasetMetadata),
        ]),
      },
    });

    // this.evm.roles = config.evm.roles;
    // this.evm.filplus = config.evm.filplus;
    // this.evm.escrow = config.evm.escrow;
    this.evm.datasetMetadata = config.evm.datasetMetadata;
    // this.evm.dataset.requirement = config.evm.dataset.requirement;
    // this.evm.dataset.proof = config.evm.dataset.proof;
    // this.evm.dataset.challenge = config.evm.dataset.challenge;
    // this.evm.matching.metadata = config.evm.matching.metadata;
    // this.evm.matching.target = config.evm.matching.target;
    // this.evm.matching.bids = config.evm.matching.bids;
    // this.evm.storages = config.evm.storages;
    // this.evm.datacaps = config.evm.datacaps;
  }
}
