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

/**
 * Service responsible for synchronizing with the blockchain.
 */
@Injectable()
export class ChainsyncService implements OnModuleInit {
  /**
   * Lifecycle hook, called once the module has been initialized.
   */
  async onModuleInit() {
    await this.startBackgroundTask();
  }

  /**
   * Start the background task for continuous synchronization.
   */
  private async startBackgroundTask() {
    while (true) {
      try {
        console.log(
          'Always crawl the latest tipset, blockMessages, and messages.',
        );
        await this.delay(1000);
      } catch (error) {
        console.error('Error in the background task:', error);
      }
    }
  }

  /**
   * Utility function to introduce a delay.
   * @param ms - The delay time in milliseconds.
   */
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
