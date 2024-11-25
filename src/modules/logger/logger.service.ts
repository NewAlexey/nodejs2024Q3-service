import { Injectable, Logger } from '@nestjs/common';

import { FileLoggerService } from 'src/modules/logger/file-logger.service';

@Injectable()
export class LoggerService extends Logger {
  private readonly fileLoggerService = new FileLoggerService({
    filePrefix: 'query',
    logFolderName: process.env.LOG_FOLDER_NAME ?? 'logs',
    fileMaxSizeKb: Number.isNaN(Number(process.env.LOG_FILE_SIZE_KB))
      ? 1024
      : Number(process.env.LOG_FILE_SIZE_KB),
  });

  private readonly fileErrorLoggerService = new FileLoggerService({
    filePrefix: 'error',
    logFolderName: process.env.LOG_FOLDER_NAME ?? 'logs',
    fileMaxSizeKb: Number.isNaN(Number(process.env.ERROR_LOG_FILE_SIZE_KB))
      ? 1024
      : Number(process.env.ERROR_LOG_FILE_SIZE_KB),
  });

  log(message: any, context?: string) {
    super.log(message, context);
    this.fileLoggerService.writeLogIntoFile(message);
  }

  error(error: any, context?: string) {
    super.error(error, context);
    this.fileErrorLoggerService.writeLogIntoFile(error.stack);
  }
}
