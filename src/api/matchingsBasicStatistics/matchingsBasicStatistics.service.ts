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
import { BasicStatistics } from "@dataswapjs/dataswapjs"
import { ValueFields, Result } from "@unipackage/utils"
import { calibrationBgTask, mainBgTask } from "../../config/backgroundTask"
import { BackgroundTask } from "src/backgroundTask"
import { QueryParam } from "src/shared/queryParams"

/**
 * Service responsible for providing root-level functionality.
 */
@Injectable()
export class MatchingsBasicStatisticsService {
    /**
     * Gets a greeting message.
     * @returns A string representing a greeting message.
     */
    async find(
        queryParam: QueryParam<BasicStatistics>
    ): Promise<Result<ValueFields<BasicStatistics>[]>> {
        let bgTask: BackgroundTask
        if (queryParam.network === "calibration") {
            bgTask = calibrationBgTask
        } else {
            bgTask = mainBgTask
        }
        return await bgTask.context.datastore.matchingsBasicStatistics.find(
            queryParam.queryFilter
        )
    }

    /**
     * Gets a total count.
     * @returns A number representing a total count by query param.
     */
    async total(
        queryParam: QueryParam<BasicStatistics>
    ): Promise<Result<number>> {
        let bgTask: BackgroundTask
        if (queryParam.network === "calibration") {
            bgTask = calibrationBgTask
        } else {
            bgTask = mainBgTask
        }
        return await bgTask.context.datastore.matchingsBasicStatistics.total(
            queryParam.queryFilter
        )
    }
}
