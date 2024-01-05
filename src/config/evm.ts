/*******************************************************************************
 *   (c) 2024 dataswap
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
    DatasetMetadataEvm,
    DatasetRequirementEvm,
    DatasetChallengeEvm,
    DatasetProofEvm,
    MatchingBidsEvm,
    MatchingMetadataEvm,
    MatchingTargetEvm,
    StoragesEvm,
    DatacapsEvm,
    EscrowEvm,
    FilplusEvm,
    RolesEvm,
} from "@dataswapjs/dataswapjs"
import datasetMetaAbi from "@dataswapcore/contracts/abi/v0.8/Datasets.json"
import datasetsRequirementAbi from "@dataswapcore/contracts/abi/v0.8/DatasetsRequirement.json"
import datasetsProofAbi from "@dataswapcore/contracts/abi/v0.8/DatasetsProof.json"
import datasetsChallengeAbi from "@dataswapcore/contracts/abi/v0.8/DatasetsChallenge.json"
import matchingsAbi from "@dataswapcore/contracts/abi/v0.8/Matchings.json"
import matchingsTargetAbi from "@dataswapcore/contracts/abi/v0.8/MatchingsTarget.json"
import matchingsBidsAbi from "@dataswapcore/contracts/abi/v0.8/MatchingsBids.json"
import storagesAbi from "@dataswapcore/contracts/abi/v0.8/Storages.json"
import datacapsAbi from "@dataswapcore/contracts/abi/v0.8/Datacaps.json"
import escrowAbi from "@dataswapcore/contracts/abi/v0.8/Escrow.json"
import filplusAbi from "@dataswapcore/contracts/abi/v0.8/Filplus.json"
import rolesAbi from "@dataswapcore/contracts/abi/v0.8/Roles.json"
import * as dotenv from "dotenv"
dotenv.config()

export const datasetMetadataEvm_Calibration = new DatasetMetadataEvm(
    datasetMetaAbi,
    "0x023e4b966b943c830b7d4cae84fe761641b29003",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetMetadataEvm_Main = new DatasetMetadataEvm(
    datasetMetaAbi,
    "0x023e4b966b943c830b7d4cae84fe761641b29003",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetRequirementEvm_Calibration = new DatasetRequirementEvm(
    datasetsRequirementAbi,
    "0x7777777777777777777777777777777777777700",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetRequirementEvm_Main = new DatasetRequirementEvm(
    datasetsRequirementAbi,
    "0x7777777777777777777777777777777777777700",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetProofEvm_Calibration = new DatasetProofEvm(
    datasetsProofAbi,
    "0x7777777777777777777777777777777777777701",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetProofEvm_Main = new DatasetProofEvm(
    datasetsProofAbi,
    "0x7777777777777777777777777777777777777701",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetChallengeEvm_Calibration = new DatasetChallengeEvm(
    datasetsChallengeAbi,
    "0x7777777777777777777777777777777777777702",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetChallengeEvm_Main = new DatasetChallengeEvm(
    datasetsChallengeAbi,
    "0x7777777777777777777777777777777777777702",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const matchingMetadataEvm_Calibration = new MatchingMetadataEvm(
    matchingsAbi,
    "0x7777777777777777777777777777777777777703",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const matchingMetadataEvm_Main = new MatchingMetadataEvm(
    matchingsAbi,
    "0x7777777777777777777777777777777777777703",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const matchingTargetEvm_Calibration = new MatchingTargetEvm(
    matchingsTargetAbi,
    "0x7777777777777777777777777777777777777704",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const matchingTargetEvm_Main = new MatchingTargetEvm(
    matchingsTargetAbi,
    "0x7777777777777777777777777777777777777704",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const matchingBidsEvm_Calibration = new MatchingBidsEvm(
    matchingsBidsAbi,
    "0x7777777777777777777777777777777777777705",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const matchingBidsEvm_Main = new MatchingBidsEvm(
    matchingsBidsAbi,
    "0x7777777777777777777777777777777777777705",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const storagesEvm_Calibration = new StoragesEvm(
    storagesAbi,
    "0x7777777777777777777777777777777777777706",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const storagesEvm_Main = new StoragesEvm(
    storagesAbi,
    "0x7777777777777777777777777777777777777706",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datacapsEvm_Calibration = new DatacapsEvm(
    datacapsAbi,
    "0x7777777777777777777777777777777777777707",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datacapsEvm_Main = new DatacapsEvm(
    datacapsAbi,
    "0x7777777777777777777777777777777777777707",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const escrowEvm_Calibration = new EscrowEvm(
    escrowAbi,
    "0x7777777777777777777777777777777777777708",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const escrowEvm_Main = new EscrowEvm(
    escrowAbi,
    "0x7777777777777777777777777777777777777708",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const filplusEvm_Calibraion = new FilplusEvm(
    filplusAbi,
    "0x7777777777777777777777777777777777777709",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const filplusEvm_Main = new FilplusEvm(
    filplusAbi,
    "0x7777777777777777777777777777777777777709",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const rolesEvm_Calibration = new RolesEvm(
    rolesAbi,
    "0x7777777777777777777777777777777777777710",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const rolesEvm_Main = new RolesEvm(
    rolesAbi,
    "0x7777777777777777777777777777777777777710",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)
