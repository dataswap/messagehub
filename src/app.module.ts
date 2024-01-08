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
import { VersionController } from "./version/version.controller"
import { VersionService } from "./version/version.service"
import { SyncController } from "./sync/sync.controller"
import { SyncService } from "./sync/sync.service"
import { TipsetController } from "./tipset/tipset.controller"
import { TipsetService } from "./tipset/tipset.service"
import { BlockController } from "./block/block.controller"
import { BlockService } from "./block/block.service"
import { MessageController } from "./message/message.controller"
import { MessageService } from "./message/message.service"
import { DataswapMessageController } from "./dataswapMessage/dataswapMessage.controller"
import { DataswapMessageService } from "./dataswapMessage/dataswapMessage.service"
import { DatasetMetadataController } from "./datasetMetadata/datasetMetadata.controller"
import { DatasetMetadataService } from "./datasetMetadata/datasetMetadata.service"
import { CarController } from "./car/car.controller"
import { CarService } from "./car/car.service"
import { CarReplicaController } from "./carReplica/carReplica.controller"
import { CarReplicaService } from "./carReplica/carReplica.service"
import { DatasetRequirementController } from "./datasetRequirement/datasetRequirement.controller"
import { DatasetRequirementService } from "./datasetRequirement/datasetRequirement.service"
import { BackgroundTaskService } from "./backgroundTask/provider/backgroundTask.service"

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
    ],
})
export class AppModule {}
