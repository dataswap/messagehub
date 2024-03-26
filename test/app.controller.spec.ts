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
import { TipsetController } from "../src/api/tipset/tipset.controller"
import { TipsetService } from "../src/api/tipset/tipset.service"
import { BlockController } from "../src/api/block/block.controller"
import { BlockService } from "../src/api/block/block.service"
import { MessageController } from "../src/api/message/message.controller"
import { MessageService } from "../src/api/message/message.service"
import { DataswapMessageController } from "../src/api/dataswapMessage/dataswapMessage.controller"
import { DataswapMessageService } from "../src/api/dataswapMessage/dataswapMessage.service"
import { DatasetMetadataController } from "../src/api/datasetMetadata/datasetMetadata.controller"
import { DatasetMetadataService } from "../src/api/datasetMetadata/datasetMetadata.service"
import { CarController } from "../src/api/car/car.controller"
import { CarService } from "../src/api/car/car.service"
import { CarReplicaController } from "../src/api/carReplica/carReplica.controller"
import { CarReplicaService } from "../src/api/carReplica/carReplica.service"
import { DatasetRequirementController } from "../src/api/datasetRequirement/datasetRequirement.controller"
import { DatasetRequirementService } from "../src/api/datasetRequirement/datasetRequirement.service"
import { DatasetProofMetadataController } from "../src/api/datasetProofMetadata/datasetProofMetadata.controller"
import { DatasetProofMetadataService } from "../src/api/datasetProofMetadata/datasetProofMetadata.service"
import { MatchingMetadataController } from "../src/api/matchingMetadata/matchingMetadata.controller"
import { MatchingMetadataService } from "../src/api/matchingMetadata/matchingMetadata.service"
import { MatchingTargetController } from "../src/api/matchingTarget/matchingTarget.controller"
import { MatchingTargetService } from "../src/api/matchingTarget/matchingTarget.service"
import { MemberController } from "../src/api/member/member.controller"
import { MemberService } from "../src/api/member/member.service"
import { MatchingBidsController } from "../src/api/matchingBids/matchingBids.controller"
import { MatchingBidsService } from "../src/api/matchingBids/matchingBids.service"
import { SyncController } from "../src/api/sync/sync.controller"
import { SyncService } from "../src/api/sync/sync.service"
import { DatasetChallengeController } from "../src/api/datasetChallenge/datasetChallenge.controller"
import { DatasetChallengeService } from "../src/api/datasetChallenge/datasetChallenge.service"
import { DatasetsStatisticsController } from "../src/api/statistics/datasetsStatistics.controller"
import { DatasetsStatisticsService } from "../src/api/statistics/datasetsStatistics.service"
import { MatchingsStatisticsController } from "../src/api/statistics/matchingsStatistics.controller"
import { MatchingsStatisticsService } from "../src/api/statistics/matchingsStatistics.service"
import { MatchingStorageStatisticsInfoController } from "../src/api/statistics/matchingStorageStatisticsInfo.controller"
import { MatchingStorageStatisticsInfoService } from "../src/api/statistics/matchingStorageStatisticsInfo.service"
import { StoragesStatisticsController } from "../src/api/statistics/storagesStatistics.controller"
import { StoragesStatisticsService } from "../src/api/statistics/storagesStatistics.service"

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
    let memberController: MemberController
    let matchingBidsController: MatchingBidsController
    let syncController: SyncController
    let datasetChallengeController: DatasetChallengeController
    let datasetsStatisticsController: DatasetsStatisticsController
    let matchingsStatisticsController: MatchingsStatisticsController
    let matchingStorageStatisticsInfoController: MatchingStorageStatisticsInfoController
    let storagesStatisticsController: StoragesStatisticsController

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
                MemberController,
                MatchingBidsController,
                SyncController,
                DatasetChallengeController,
                DatasetsStatisticsController,
                MatchingsStatisticsController,
                StoragesStatisticsController,
                MatchingStorageStatisticsInfoController,
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
                MemberService,
                MatchingBidsService,
                SyncService,
                DatasetChallengeService,
                DatasetsStatisticsService,
                MatchingsStatisticsService,
                StoragesStatisticsService,
                MatchingStorageStatisticsInfoService,
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
        memberController = root.get<MemberController>(MemberController)
        matchingBidsController = root.get<MatchingBidsController>(
            MatchingBidsController
        )
        syncController = root.get<SyncController>(SyncController)
        datasetChallengeController = root.get<DatasetChallengeController>(
            DatasetChallengeController
        )
        datasetsStatisticsController = root.get<DatasetsStatisticsController>(
            DatasetsStatisticsController
        )
        matchingsStatisticsController = root.get<MatchingsStatisticsController>(
            MatchingsStatisticsController
        )
        storagesStatisticsController = root.get<StoragesStatisticsController>(
            StoragesStatisticsController
        )
        matchingStorageStatisticsInfoController =
            root.get<MatchingStorageStatisticsInfoController>(
                MatchingStorageStatisticsInfoController
            )
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
    describe("datasetsstatistics query", () => {
        it("should ok", async () => {
            const res = await datasetsStatisticsController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [
                        {
                            height: {
                                $gt: BigInt(1409464),
                                $lt: BigInt(1409470),
                            },
                        },
                    ],
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
    describe("member query", () => {
        it("should ok", async () => {
            const res = await memberController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [
                        { totalDatasetsSubmitted: { $gt: 0, $lt: 3 } },
                    ],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })
    describe("matchingbids query", () => {
        it("should ok", async () => {
            const res = await matchingBidsController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ matchingId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })
    describe("matchingsstatistics query", () => {
        it("should ok", async () => {
            const res = await matchingsStatisticsController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [
                        {
                            height: {
                                $gt: BigInt(1409460),
                                $lt: BigInt(1409470),
                            },
                        },
                    ],
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

    describe("datasetchallenge query", () => {
        it("should ok", async () => {
            const res = await datasetChallengeController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ datasetId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })

    describe("matchingStorageStatisticsInfo query", () => {
        it("should ok", async () => {
            const res = await matchingStorageStatisticsInfoController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ matchingId: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })

    describe("storagesStatistics query", () => {
        it("should ok", async () => {
            const res = await storagesStatisticsController.find({
                network: "calibration",
                queryFilter: {
                    conditions: [{ totalCounts: { $gt: 0, $lt: 3 } }],
                },
            })
            expect(res.ok).toBe(true)
        }, 300000)
    })
})
