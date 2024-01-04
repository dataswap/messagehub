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

import { Injectable, OnModuleInit } from '@nestjs/common';
import { calibrationBgTask, mainBgTask } from '../../config/backgroundTask';
// import { mainBgTask, calibrationBgTask } from '../../config/backgroundTask';

/**
 * Service responsible for synchronizing with the blockchain.
 */
@Injectable()
export class BackgroundTaskService implements OnModuleInit {
  /**
   * Lifecycle hook, called once the module has been initialized.
   */
  onModuleInit() {
    this.startBackgroundTask();
  }

  /**
   * Start the background task for continuous synchronization.
   */
  private async startBackgroundTask() {
    try {
      await mainBgTask.context.datastore.baseConnection.connect();
      await calibrationBgTask.context.datastore.baseConnection.connect();
      // const mainBgTaskPromise = mainBgTask.start();
      const calibrationBgTaskPromise = calibrationBgTask.start();
      await Promise.all([calibrationBgTaskPromise]);
      // await Promise.all([mainBgTaskPromise,calibrationBgTaskPromise]);
    } catch (error) {
      await mainBgTask.context.datastore.baseConnection.disconnect();
      await calibrationBgTask.context.datastore.baseConnection.disconnect();
      throw new Error(`Error in the background task:${error}`);
    }
  }
}
