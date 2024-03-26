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

import { Module } from "@nestjs/common"
import { VersionController } from "./api/version/version.controller"
import { VersionService } from "./api/version/version.service"
import { SyncController } from "./api/sync/sync.controller"
import { SyncService } from "./api/sync/sync.service"
import { TipsetController } from "./api/tipset/tipset.controller"
import { TipsetService } from "./api/tipset/tipset.service"
import { BlockController } from "./api/block/block.controller"
import { BlockService } from "./api/block/block.service"
import { MessageController } from "./api/message/message.controller"
import { MessageService } from "./api/message/message.service"
import { DataswapMessageController } from "./api/dataswapMessage/dataswapMessage.controller"
import { DataswapMessageService } from "./api/dataswapMessage/dataswapMessage.service"
import { DatasetMetadataController } from "./api/datasetMetadata/datasetMetadata.controller"
import { DatasetMetadataService } from "./api/datasetMetadata/datasetMetadata.service"
import { CarController } from "./api/car/car.controller"
import { CarService } from "./api/car/car.service"
import { CarReplicaController } from "./api/carReplica/carReplica.controller"
import { CarReplicaService } from "./api/carReplica/carReplica.service"
import { DatasetRequirementController } from "./api/datasetRequirement/datasetRequirement.controller"
import { DatasetRequirementService } from "./api/datasetRequirement/datasetRequirement.service"
import { DatasetProofMetadataController } from "./api/datasetProofMetadata/datasetProofMetadata.controller"
import { DatasetProofMetadataService } from "./api/datasetProofMetadata/datasetProofMetadata.service"
import { MatchingMetadataController } from "./api/matchingMetadata/matchingMetadata.controller"
import { MatchingMetadataService } from "./api/matchingMetadata/matchingMetadata.service"
import { MatchingTargetController } from "./api/matchingTarget/matchingTarget.controller"
import { MatchingTargetService } from "./api/matchingTarget/matchingTarget.service"
import { MemberController } from "./api/member/member.controller"
import { MemberService } from "./api/member/member.service"
import { MatchingBidsController } from "./api/matchingBids/matchingBids.controller"
import { MatchingBidsService } from "./api/matchingBids/matchingBids.service"
import { BackgroundTaskService } from "./backgroundTask/provider/backgroundTask.service"
import { DatasetChallengeController } from "./api/datasetChallenge/datasetChallenge.controller"
import { DatasetChallengeService } from "./api/datasetChallenge/datasetChallenge.service"
import { DatasetsStatisticsController } from "./api/statistics/datasetsStatistics.controller"
import { DatasetsStatisticsService } from "./api/statistics/datasetsStatistics.service"
import { MatchingStorageStatisticsInfoController } from "./api/statistics/matchingStorageStatisticsInfo.controller"
import { MatchingStorageStatisticsInfoService } from "./api/statistics/matchingStorageStatisticsInfo.service"
import { StoragesStatisticsController } from "./api/statistics/storagesStatistics.controller"
import { StoragesStatisticsService } from "./api/statistics/storagesStatistics.service"
import { MatchingsStatisticsController } from "./api/statistics/matchingsStatistics.controller"
import { MatchingsStatisticsService } from "./api/statistics/matchingsStatistics.service"
/**
 * Root module for the application.
 */
@Module({
    imports: [],
    controllers: [
        VersionController,
        SyncController,
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
        DatasetChallengeController,
        DatasetsStatisticsController,
        MatchingsStatisticsController,
        MatchingStorageStatisticsInfoController,
        StoragesStatisticsController,
    ],
    providers: [
        VersionService,
        SyncService,
        TipsetService,
        BlockService,
        MessageService,
        BackgroundTaskService,
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
        DatasetChallengeService,
        DatasetsStatisticsService,
        MatchingsStatisticsService,
        MatchingStorageStatisticsInfoService,
        StoragesStatisticsService,
    ],
})
export class AppModule {}
