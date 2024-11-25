import { Controller, Get, Logger } from '@nestjs/common';

import { AppService } from 'src/app.service';
import { Public } from 'src/modules/auth/permission/public.decorator';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    this.logger.error('Testing error log level');
    this.logger.warn('Testing warn log level');
    this.logger.log('Testing log log level');
    this.logger.debug('Testing debug log level');
    this.logger.verbose('Testing verbose log level');

    return this.appService.getHello();
  }

  @Get('error')
  @Public()
  getErroredHello(): string {
    JSON.parse('?error/');
    return this.appService.getHello();
  }
}
