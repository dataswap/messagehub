import { calibrationBgTask } from '../../src/config/backgroundTask';
import { delay } from '@unipackage/utils';
import * as dotenv from 'dotenv';
dotenv.config();

describe('BackgroundTask', () => {
  beforeAll(() => {
    calibrationBgTask.start();
  });

  afterAll(() => {
    calibrationBgTask.stop();
  });

  it('background task test', async () => {
    expect(calibrationBgTask.isRunning()).toBe(true);

    const startHeight = calibrationBgTask.getStartHeight();
    expect(startHeight).toBe(Number(process.env.CALIBRATION_START_HEIGHT));

    const startSyncHeight = calibrationBgTask.getCurrentSyncHeight();
    await delay(20000);
    const endSyncHeight = calibrationBgTask.getCurrentSyncHeight();
    expect(endSyncHeight - startSyncHeight > 0).toBe(true);

    const tipsets = await calibrationBgTask.context.datastore.tipset.find({});
    const blocks = await calibrationBgTask.context.datastore.block.find({});
    const messages = await calibrationBgTask.context.datastore.message.find({});
    const dataswapMessages =
      await calibrationBgTask.context.datastore.dataswapMessage.find({});
    const datasetMetadata =
      await calibrationBgTask.context.datastore.datasetMetadata.find({});

    expect(tipsets.data.length > 0).toBe(true);
    expect(blocks.data.length > 0).toBe(true);
    expect(messages.data.length > 0).toBe(true);
    expect(dataswapMessages.data.length > 0).toBe(true);
    expect(datasetMetadata.data.length > 0).toBe(true);
  }, 100000);
});
