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

import { BackgroundTask } from '../backgroundTask';
import { Config, Context } from '../backgroundTask/context';
import { EvmContext } from '../backgroundTask/interface';
import { Syncer } from '../backgroundTask/syncer';
import { Decoder } from '../backgroundTask/decoder';
import { Storager } from '../backgroundTask/storager';
import { datasetMetadataEvm_Calibration } from './evm';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Calibration network configuration
 */
export const calibrationConfig: Config = {
  apiAddress: process.env.CALIBRATION_LOTUS_API_ENDPOINT as string,
  token: process.env.CALIBRATION_LOTUS_TOKEN as string,
  mongoUrl: process.env.CALIBRATION_MONGO_URL as string,
  startHeight: 1213437,
  evm: {
    datasetMetadata: datasetMetadataEvm_Calibration,
  },
};

/**
 * Main network configuration
 */
export const mainConfig: Config = {
  apiAddress: process.env.MAIN_LOTUS_API_ENDPOINT as string,
  token: process.env.MAIN_LOTUS_TOKEN as string,
  mongoUrl: process.env.MAIN_MONGO_URL as string,
  startHeight: 3511591,
  evm: {} as EvmContext,
};

/**
 * Calibration context instance created with the calibration configuration.
 */
export const calibrationContext = new Context(calibrationConfig);

/**
 * Main context instance created with the main configuration.
 */
export const mainContext = new Context(mainConfig);

/**
 * Main background task instance configured with the main context and its dependencies.
 */
export const mainBgTask = new BackgroundTask({
  context: mainContext,
  syncer: new Syncer(mainContext),
  decoder: new Decoder(mainContext),
  storager: new Storager(mainContext),
});

/**
 * Calibration background task instance configured with the calibration context and its dependencies.
 */
export const calibrationBgTask = new BackgroundTask({
  context: calibrationContext,
  syncer: new Syncer(calibrationContext),
  decoder: new Decoder(calibrationContext),
  storager: new Storager(calibrationContext),
});
