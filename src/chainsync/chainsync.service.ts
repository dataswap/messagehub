import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class ChainsyncService implements OnModuleInit {
  async onModuleInit() {
    await this.startBackgroundTask();
  }

  private async startBackgroundTask() {
    while (true) {
      try {
        console.log(
          'Always craw the lastest tipset ,blockMessages and messages ',
        );
        await this.delay(1000);
      } catch (error) {
        console.error('Error in background task:', error);
      }
    }
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
