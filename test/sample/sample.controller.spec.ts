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

import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from '../../src/sample/sample.controller';
import { SampleService } from '../../src/sample/sample.service';

describe('SampleController', () => {
  let sampleController: SampleController;

  beforeEach(async () => {
    const root: TestingModule = await Test.createTestingModule({
      controllers: [SampleController],
      providers: [SampleService],
    }).compile();

    sampleController = root.get<SampleController>(SampleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sampleController.getHello(1)).toBe('Hello World!');
    });
  });
});
