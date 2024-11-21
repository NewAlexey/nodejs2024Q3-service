import { Controller, Get } from '@nestjs/common';

import { AppService } from 'src/app.service';
import { Public } from 'src/modules/auth/permission/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
