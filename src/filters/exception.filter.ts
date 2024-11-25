import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from 'src/modules/logger/logger.service';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {
    process.on('unhandledRejection', (err) => {
      this.logger.error(err, 'CatchFilter');
    });

    process.on('uncaughtException', (err) => {
      this.logger.error(err, 'CatchFilter');
    });
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception, 'CatchFilter');
    const { httpAdapter } = this.httpAdapterHost;

    const context = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      message: (exception as any)?.message ?? 'Server Error',
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(context.getRequest()),
    };

    httpAdapter.reply(context.getResponse(), responseBody, httpStatus);
  }
}
