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
    CarstoreEvm,
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
import carstoreAbi from "@dataswapcore/contracts/abi/v0.8/Carstore.json"
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

export const carstoreEvm_Calibration = new CarstoreEvm(
    carstoreAbi,
    "0xC7FBF8Df0A6E584A17361e7E4287EE3a1F72b7b5",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)
export const carstoreEvm_Main = new CarstoreEvm(
    carstoreAbi,
    "0x7777777777777777777777777777777777777777",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const datasetMetadataEvm_Calibration = new DatasetMetadataEvm(
    datasetMetaAbi,
    "0x27400663b98367C5D4b04480030D4DDe193C2fEa",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetMetadataEvm_Main = new DatasetMetadataEvm(
    datasetMetaAbi,
    "0x7777777777777777777777777777777777777777",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const datasetRequirementEvm_Calibration = new DatasetRequirementEvm(
    datasetsRequirementAbi,
    "0xAdE3e240736e550837e5b65b0163bbD56178aDdD",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetRequirementEvm_Main = new DatasetRequirementEvm(
    datasetsRequirementAbi,
    "0x7777777777777777777777777777777777777700",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const datasetProofEvm_Calibration = new DatasetProofEvm(
    datasetsProofAbi,
    "0x15764e7bE0638696B88ECF39fc7f6167aB53552f",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetProofEvm_Main = new DatasetProofEvm(
    datasetsProofAbi,
    "0x7777777777777777777777777777777777777701",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const datasetChallengeEvm_Calibration = new DatasetChallengeEvm(
    datasetsChallengeAbi,
    "0x60AcEb9dafE38D428f4DC7eBF01fa604EfDc4e0f",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datasetChallengeEvm_Main = new DatasetChallengeEvm(
    datasetsChallengeAbi,
    "0x7777777777777777777777777777777777777702",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const matchingMetadataEvm_Calibration = new MatchingMetadataEvm(
    matchingsAbi,
    "0xdc9Df3dC24202451535E4eB0A3ecBBF4B64ae5C8",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const matchingMetadataEvm_Main = new MatchingMetadataEvm(
    matchingsAbi,
    "0x7777777777777777777777777777777777777703",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const matchingTargetEvm_Calibration = new MatchingTargetEvm(
    matchingsTargetAbi,
    "0xcA2852b58a67650cA6F220BA68267140caC7D915",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const matchingTargetEvm_Main = new MatchingTargetEvm(
    matchingsTargetAbi,
    "0x7777777777777777777777777777777777777704",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const matchingBidsEvm_Calibration = new MatchingBidsEvm(
    matchingsBidsAbi,
    "0x527786A491cAe85237e00b8d0A483DBc8D449e2b",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const matchingBidsEvm_Main = new MatchingBidsEvm(
    matchingsBidsAbi,
    "0x7777777777777777777777777777777777777705",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const storagesEvm_Calibration = new StoragesEvm(
    storagesAbi,
    "0x4AEF9E8A0acc86404FF704398eBB023E014C5335",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const storagesEvm_Main = new StoragesEvm(
    storagesAbi,
    "0x7777777777777777777777777777777777777706",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const datacapsEvm_Calibration = new DatacapsEvm(
    datacapsAbi,
    "0x2b06517fd3971E5829399f27f6C0F3f497F85ECc",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const datacapsEvm_Main = new DatacapsEvm(
    datacapsAbi,
    "0x7777777777777777777777777777777777777707",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const escrowEvm_Calibration = new EscrowEvm(
    escrowAbi,
    "0x0862a413920eFa1958dB61BD3fEC70c60B8Ed018",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const escrowEvm_Main = new EscrowEvm(
    escrowAbi,
    "0x7777777777777777777777777777777777777708",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const filplusEvm_Calibraion = new FilplusEvm(
    filplusAbi,
    "0xf547A6284A3964580DD8F60C7Fe1cA2ACacE48e6",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const filplusEvm_Main = new FilplusEvm(
    filplusAbi,
    "0x7777777777777777777777777777777777777709",
    process.env.MAIN_LOTUS_PROVIDER_URL
)

export const rolesEvm_Calibration = new RolesEvm(
    rolesAbi,
    "0x40769d4797a4fc1A60529a5096bcFfd2b7c66317",
    process.env.CALIBRATION_LOTUS_PROVIDER_URL
)

export const rolesEvm_Main = new RolesEvm(
    rolesAbi,
    "0x7777777777777777777777777777777777777710",
    process.env.MAIN_LOTUS_PROVIDER_URL
)
