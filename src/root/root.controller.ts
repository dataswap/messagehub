import { Controller, Get, Param } from '@nestjs/common';
import { RootService } from './root.service';

@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Get(':id')
  getHello(@Param() param): string {
    console.log(param.id);
    return this.rootService.getHello();
  }
}
