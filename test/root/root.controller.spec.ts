import { Test, TestingModule } from '@nestjs/testing';
import { RootController } from '../../src/root/root.controller';
import { RootService } from '../../src/root/root.service';

describe('RootController', () => {
  let rootController: RootController;

  beforeEach(async () => {
    const root: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
      providers: [RootService],
    }).compile();

    rootController = root.get<RootController>(RootController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rootController.getHello(1)).toBe('Hello World!');
    });
  });
});
