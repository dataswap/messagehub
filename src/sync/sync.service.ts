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

import { Injectable } from "@nestjs/common"
import { Result } from "@unipackage/utils"
import { calibrationBgTask, mainBgTask } from "../config/backgroundTask"
import { BackgroundTask } from "src/backgroundTask"
import { QueryParam } from "../shared/queryParams"

export interface SyncStatus {
    startSyncHeight: number
    currentSyncHeight: number
    isRunning: boolean
}

/**
 * Service responsible for providing root-level functionality.
 */
@Injectable()
export class SyncService {
    /**
     * Gets a greeting message.
     * @returns A string representing a greeting message.
     */
    getSyncStatus(queryParam: QueryParam<void>): Result<SyncStatus> {
        let bgTask: BackgroundTask
        if (queryParam.network === "calibration") {
            bgTask = calibrationBgTask
        } else {
            bgTask = mainBgTask
        }
        return {
            ok: true,
            data: {
                currentSyncHeight: bgTask.getCurrentSyncHeight(),
                startSyncHeight: bgTask.getStartHeight(),
                isRunning: bgTask.isRunning(),
            },
        }
    }
}
