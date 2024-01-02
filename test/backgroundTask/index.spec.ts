import { calibrationBgTask } from '../../src/config/backgroundTask';

describe('BackgroundTask', () => {
  beforeAll(() => {
    calibrationBgTask.start();
  });

  afterAll(() => {
    calibrationBgTask.stop();
  });

  it('should stop the background task', () => {
    expect(calibrationBgTask.isRunning()).toBe(true);
    calibrationBgTask.stop();
    expect(calibrationBgTask.isRunning()).toBe(false);
  });
});
