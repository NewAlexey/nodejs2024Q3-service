import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
  log(message: any, context?: string) {
    super.log(message, context);
  }
}
