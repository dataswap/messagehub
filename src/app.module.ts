import { Module } from '@nestjs/common';
import { RootController } from './root/root.controller';
import { RootService } from './root/root.service';
import { ChainsyncService } from './chainsync/chainsync.service';

@Module({
  imports: [],
  controllers: [RootController],
  providers: [RootService, ChainsyncService],
})
export class AppModule {}
