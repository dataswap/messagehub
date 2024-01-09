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
import { calibrationBgTask } from "../src/config/backgroundTask"
import { delay } from "@unipackage/utils"

import { Test, TestingModule } from "@nestjs/testing"
import { TipsetController } from "../src/tipset/tipset.controller"
import { TipsetService } from "../src/tipset/tipset.service"
import { BlockController } from "../src/block/block.controller"
import { BlockService } from "../src/block/block.service"
import { MessageController } from "../src/message/message.controller"
import { MessageService } from "../src/message/message.service"
import { DataswapMessageController } from "../src/dataswapMessage/dataswapMessage.controller"
import { DataswapMessageService } from "../src/dataswapMessage/dataswapMessage.service"
import { DatasetMetadataController } from "../src/datasetMetadata/datasetMetadata.controller"
import { DatasetMetadataService } from "../src/datasetMetadata/datasetMetadata.service"
import { CarController } from "../src/car/car.controller"
import { CarService } from "../src/car/car.service"
import { CarReplicaController } from "../src/carReplica/carReplica.controller"
import { CarReplicaService } from "../src/carReplica/carReplica.service"
import { DatasetRequirementController } from "../src/datasetRequirement/datasetRequirement.controller"
import { DatasetRequirementService } from "../src/datasetRequirement/datasetRequirement.service"
import { DatasetProofMetadataController } from "../src/datasetProofMetadata/datasetProofMetadata.controller"
import { DatasetProofMetadataService } from "../src/datasetProofMetadata/datasetProofMetadata.service"
import { MatchingMetadataController } from "../src/matchingMetadata/matchingMetadata.controller"
import { MatchingMetadataService } from "../src/matchingMetadata/matchingMetadata.service"
import { MatchingTargetController } from "../src/matchingTarget/matchingTarget.controller"
import { MatchingTargetService } from "../src/matchingTarget/matchingTarget.service"
import { SyncController } from "../src/sync/sync.controller"
import { SyncService } from "../src/sync/sync.service"

describe("AppController Test", () => {
    let tipsetController: TipsetController
    let blockController: BlockController
    let messageController: MessageController
    let dataswapMessageController: DataswapMessageController
    let datasetMetadataController: DatasetMetadataController
    let carController: CarController
    let carReplicaController: CarReplicaController
    let datasetRequirementController: DatasetRequirementController
    let datasetProofMetadataController: DatasetProofMetadataController
    let matchingMetadataController: MatchingMetadataController
    let matchingTargetController: MatchingTargetController
    let syncController: SyncController

    beforeAll(async () => {
        calibrationBgTask.start()
        await delay(20000)
    }, 30000)

    afterAll(() => {
        calibrationBgTask.stop()
    })

    beforeEach(async () => {
        const root: TestingModule = await Test.createTestingModule({
            controllers: [
                TipsetController,
                BlockController,
                MessageController,
                DataswapMessageController,
                DatasetMetadataController,
                CarController,
                CarReplicaController,
                DatasetRequirementController,
                DatasetProofMetadataController,
                MatchingMetadataController,
                MatchingTargetController,
                SyncController,
            ],
            providers: [
                TipsetService,
                BlockService,
                MessageService,
                DataswapMessageService,
                DatasetMetadataService,
                CarService,
                CarReplicaService,
                DatasetRequirementService,
                DatasetProofMetadataService,
                MatchingMetadataService,
                MatchingTargetService,
                SyncService,
            ],
        }).compile()

        tipsetController = root.get<TipsetController>(TipsetController)
        blockController = root.get<BlockController>(BlockController)
        messageController = root.get<MessageController>(MessageController)
        dataswapMessageController = root.get<DataswapMessageController>(
            DataswapMessageController
        )
        datasetMetadataController = root.get<DatasetMetadataController>(
            DatasetMetadataController
        )
        carController = root.get<CarController>(CarController)
        carReplicaController =
            root.get<CarReplicaController>(CarReplicaController)
        datasetRequirementController = root.get<DatasetRequirementController>(
            DatasetRequirementController
        )
        datasetProofMetadataController =
            root.get<DatasetProofMetadataController>(
                DatasetProofMetadataController
            )
        matchingMetadataController = root.get<MatchingMetadataController>(
            MatchingMetadataController
        )
        matchingTargetController = root.get<MatchingTargetController>(
            MatchingTargetController
        )
        syncController = root.get<SyncController>(SyncController)
    })

    describe("tipset query", () => {
        it("should ok", async () => {
            const res = await tipsetController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })

    describe("block query", () => {
        it("should ok", async () => {
            const res = await blockController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })

    describe("message query", () => {
        it("should ok", async () => {
            const res = await messageController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })

    describe("dataswapmessage query", () => {
        it("should ok", async () => {
            const res = await dataswapMessageController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ height: { $gt: 1213437, $lt: 1213439 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })

    describe("datasetmetadata query", () => {
        it("should ok", async () => {
            const res = await datasetMetadataController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ datasetId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })

    describe("car query", () => {
        it("should ok", async () => {
            const res = await carController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ carId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })
    describe("carreplica query", () => {
        it("should ok", async () => {
            const res = await carReplicaController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ carId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })
    describe("datasetrequirement query", () => {
        it("should ok", async () => {
            const res = await datasetRequirementController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ datasetId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })
    describe("datasetproofmetadata query", () => {
        it("should ok", async () => {
            const res = await datasetProofMetadataController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ datasetId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })
    describe("matchingmetadata query", () => {
        it("should ok", async () => {
            const res = await matchingMetadataController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ matchingId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })
    describe("matchingtarget query", () => {
        it("should ok", async () => {
            const res = await matchingTargetController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ matchingId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })

    describe("syncstatus query", () => {
        it("should ok", async () => {
            const res = await syncController.getSyncStatus({
                network: "1",
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })
})
