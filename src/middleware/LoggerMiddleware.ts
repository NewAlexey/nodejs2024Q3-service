import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const requestLogMessage = this.createRequestLogMessage(request);
      const responseLogMessage = this.createResponseLogMessage(response);
      const logMessage = `${new Date().toISOString()} | Request - ${requestLogMessage} | Response - ${responseLogMessage}`;
      this.logger.log(logMessage);
    });

    next();
  }

  private createRequestLogMessage(request: Request): string {
    const bodyData = this.getBodyDataMessage(request.body);
    const bodyMessage = bodyData ? `, body - ${bodyData}` : '';

    return `[${request.method}, query - ${request.url}${bodyMessage}]`;
  }

  private createResponseLogMessage(response: Response): string {
    const { statusCode } = response;

    return `[code - ${statusCode}]`;
  }

  private getBodyDataMessage(body: any): string {
    const isBodyExist = Boolean(Object.keys(body).length);

    if (!isBodyExist) {
      return '';
    }

    return JSON.stringify(body);
  }
}
