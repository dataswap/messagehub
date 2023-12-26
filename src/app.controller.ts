import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getHello(@Param() param): string {
    console.log(param.id);
    return this.appService.getHello();
  }
}
