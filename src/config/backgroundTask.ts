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

import { BackgroundTask } from "../backgroundTask"
import { Config, Context } from "../backgroundTask/context"
import { Syncer } from "../backgroundTask/syncer"
import { Decoder } from "../backgroundTask/decoder"
import { Storager } from "../backgroundTask/storager"
import {
    carstoreEvm_Calibration,
    carstoreEvm_Main,
    datasetChallengeEvm_Calibration,
    datasetChallengeEvm_Main,
    datasetMetadataEvm_Calibration,
    datasetMetadataEvm_Main,
    datasetProofEvm_Calibration,
    datasetProofEvm_Main,
    datasetRequirementEvm_Calibration,
    datasetRequirementEvm_Main,
    filplusEvm_Calibraion,
    filplusEvm_Main,
    matchingBidsEvm_Calibration,
    matchingBidsEvm_Main,
    matchingMetadataEvm_Calibration,
    matchingMetadataEvm_Main,
    matchingTargetEvm_Calibration,
    matchingTargetEvm_Main,
    rolesEvm_Calibration,
    rolesEvm_Main,
    storagesEvm_Calibration,
    storagesEvm_Main,
} from "@dataswapjs/dataswapjs"
import * as dotenv from "dotenv"
dotenv.config()

/**
 * Calibration network configuration
 */
export const calibrationConfig: Config = {
    apiAddress: process.env.CALIBRATION_LOTUS_API_ENDPOINT as string,
    token: process.env.CALIBRATION_LOTUS_TOKEN as string,
    mongoUrl:
        process.env.NODE_ENV === "production"
            ? (process.env.CALIBRATION_PROD_MONGO_URL as string)
            : (process.env.CALIBRATION_MONGO_URL as string),
    startHeight: Number(process.env.CALIBRATION_START_HEIGHT as string),
    evm: {
        carstore: carstoreEvm_Calibration,
        datasetMetadata: datasetMetadataEvm_Calibration,
        datasetRequirement: datasetRequirementEvm_Calibration,
        datasetProof: datasetProofEvm_Calibration,
        datasetChallenge: datasetChallengeEvm_Calibration,
        matchingMetadata: matchingMetadataEvm_Calibration,
        matchingTarget: matchingTargetEvm_Calibration,
        matchingBids: matchingBidsEvm_Calibration,
        storages: storagesEvm_Calibration,
        roles: rolesEvm_Calibration,
        filplus: filplusEvm_Calibraion,
    },
    notRunSynctask:
        process.env.CALIBRATION_NOT_RUN_SYNCTASK &&
        (process.env.CALIBRATION_NOT_RUN_SYNCTASK as string).toLowerCase() ===
            "yes",
}

/**
 * Main network configuration
 */
export const mainConfig: Config = {
    apiAddress: process.env.MAIN_LOTUS_API_ENDPOINT as string,
    token: process.env.MAIN_LOTUS_TOKEN as string,
    mongoUrl:
        process.env.NODE_ENV === "production"
            ? (process.env.MAIN_PROD_MONGO_URL as string)
            : (process.env.MAIN_MONGO_URL as string),
    startHeight: Number(process.env.MAIN_START_HEIGHT as string),
    evm: {
        carstore: carstoreEvm_Main,
        datasetMetadata: datasetMetadataEvm_Main,
        datasetRequirement: datasetRequirementEvm_Main,
        datasetProof: datasetProofEvm_Main,
        datasetChallenge: datasetChallengeEvm_Main,
        matchingMetadata: matchingMetadataEvm_Main,
        matchingTarget: matchingTargetEvm_Main,
        matchingBids: matchingBidsEvm_Main,
        storages: storagesEvm_Main,
        roles: rolesEvm_Main,
        filplus: filplusEvm_Main,
    },
    notRunSynctask:
        process.env.MAIN_NOT_RUN_SYNCTASK &&
        (process.env.MAIN_NOT_RUN_SYNCTASK as string).toLowerCase() === "yes",
}

/**
 * Calibration context instance created with the calibration configuration.
 */
export const calibrationContext = new Context(calibrationConfig)

/**
 * Main context instance created with the main configuration.
 */
export const mainContext = new Context(mainConfig)

/**
 * Main background task instance configured with the main context and its dependencies.
 */
export const mainBgTask = new BackgroundTask({
    context: mainContext,
    syncer: new Syncer(mainContext),
    decoder: new Decoder(mainContext),
    storager: new Storager(mainContext),
})

/**
 * Calibration background task instance configured with the calibration context and its dependencies.
 */
export const calibrationBgTask = new BackgroundTask({
    context: calibrationContext,
    syncer: new Syncer(calibrationContext),
    decoder: new Decoder(calibrationContext),
    storager: new Storager(calibrationContext),
})
