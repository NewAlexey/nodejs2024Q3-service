import { LogLevel } from '@nestjs/common/services/logger.service';

export function getAppLogsLevel(): LogLevel[] {
  const appLogLevelList: LogLevel[] = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
  ];

  const currentLogLevel = Number(process.env.LOG_LEVEL);

  if (Number.isNaN(currentLogLevel)) {
    return appLogLevelList;
  }

  return appLogLevelList.slice(0, currentLogLevel + 1);
}
