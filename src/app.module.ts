import { Module } from '@nestjs/common';
import { RootController } from './root/root.controller';
import { RootService } from './root/root.service';

@Module({
  imports: [],
  controllers: [RootController],
  providers: [RootService],
})
export class AppModule {}
