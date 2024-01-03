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
import { calibrationBgTask } from '../src/config/backgroundTask';
import { delay } from '@unipackage/utils';

import { Test, TestingModule } from '@nestjs/testing';
import { TipsetController } from '../src/tipset/tipset.controller';
import { TipsetService } from '../src/tipset/tipset.service';
import { BlockController } from '../src/block/block.controller';
import { BlockService } from '../src/block/block.service';
import { MessageController } from '../src/message/message.controller';
import { MessageService } from '../src/message/message.service';

describe('AppController Test', () => {
  let tipsetController: TipsetController;
  let blockController: BlockController;
  let messageController: MessageController;

  beforeAll(async () => {
    calibrationBgTask.start();
    await delay(20000);
  }, 30000);

  afterAll(() => {
    calibrationBgTask.stop();
  });

  beforeEach(async () => {
    const root: TestingModule = await Test.createTestingModule({
      controllers: [TipsetController, BlockController, MessageController],
      providers: [TipsetService, BlockService, MessageService],
    }).compile();

    tipsetController = root.get<TipsetController>(TipsetController);
    blockController = root.get<BlockController>(BlockController);
    messageController = root.get<MessageController>(MessageController);
  });

  describe('tipset query', () => {
    it('should ok', async () => {
      const res = await tipsetController.find({
        conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
      });
      expect(res.ok).toBe(true);
    }, 300000);
  });

  describe('block query', () => {
    it('should ok', async () => {
      const res = await blockController.find({
        conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
      });
      expect(res.ok).toBe(true);
    }, 300000);
  });

  describe('message query', () => {
    it('should ok', async () => {
      const res = await messageController.find({
        conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
      });
      expect(res.ok).toBe(true);
    }, 300000);
  });
});
