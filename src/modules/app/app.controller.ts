import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ description: 'Returns you OK!' })
  @Get('healthcheck')
  healthCheck(): string {
    return this.appService.healthCheck();
  }
}
