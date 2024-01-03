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
import { calibrationBgTask } from '../../src/config/backgroundTask';
import { delay } from '@unipackage/utils';

import { Test, TestingModule } from '@nestjs/testing';
import { TipsetController } from '../../src/tipset/tipset.controller';
import { TipsetService } from '../../src/tipset/tipset.service';

describe('SampleController', () => {
  let tipsetController: TipsetController;

  beforeAll(() => {
    calibrationBgTask.start();
  });

  afterAll(() => {
    calibrationBgTask.stop();
  });

  beforeEach(async () => {
    const root: TestingModule = await Test.createTestingModule({
      controllers: [TipsetController],
      providers: [TipsetService],
    }).compile();

    tipsetController = root.get<TipsetController>(TipsetController);
  });

  describe('tipset query', () => {
    it('should ok', async () => {
      await delay(20000);
      const res = await tipsetController.find({
        conditions: [{ Height: { $gt: 1213437, $lt: 1213439 } }],
      });
      expect(res.ok).toBe(true);
    }, 500000);
  });
});
