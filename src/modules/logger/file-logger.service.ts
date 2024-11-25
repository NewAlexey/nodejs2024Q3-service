import { EOL } from 'os';
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  stat,
  writeFile,
} from 'fs';

type FileLoggerProps = {
  filePrefix?: string;
  logFolderName?: string;
  fileMaxSizeKb: number;
};

export class FileLoggerService {
  private readonly FILE_PREFIX: string;
  private readonly LOG_DIRECTORY_DESTINATION: string;

  private readonly MAX_LOG_FILE_NAME_KB = Number.isNaN(
    Number(process.env.LOG_FILE_SIZE_KB),
  )
    ? 1024
    : Number(process.env.LOG_FILE_SIZE_KB);

  private readonly SYSTEM_EOL = EOL;

  private currentLogFileDestination: string;
  private currentLogFileIndex = 1;

  constructor({
    fileMaxSizeKb,
    logFolderName = 'logs',
    filePrefix = '',
  }: FileLoggerProps) {
    this.FILE_PREFIX = filePrefix;
    this.LOG_DIRECTORY_DESTINATION = `${process.cwd()}/${logFolderName}`;
    this.MAX_LOG_FILE_NAME_KB = fileMaxSizeKb;

    this.initialize();
  }

  public writeLogIntoFile(message: any): void {
    this.writeDataIntoFile(message, this.currentLogFileDestination);
  }

  private initialize(): void {
    this.initFolder();
    this.initLogFileName();
  }

  private writeDataIntoFile(message: any, fileDestination: string): void {
    writeFile(
      fileDestination,
      `${message}${this.SYSTEM_EOL}` ?? '',
      { flag: 'a' },
      (error) => {
        if (error) {
          throw error;
        }

        this.checkLogFileSize(fileDestination);
      },
    );
  }

  private checkLogFileSize(fileDestination: string): void {
    stat(fileDestination, (err, stats) => {
      if (err) {
        throw err;
      }

      const { size } = stats;

      if (size >= this.MAX_LOG_FILE_NAME_KB * 1024) {
        this.rotateLogFile(this.currentLogFileDestination);
      }
    });
  }

  private rotateLogFile(fileDestination: string): void {
    const lastFileIndex = getFileIndex(fileDestination);

    this.setCurrentLogFileData(Number(lastFileIndex) + 1);
  }

  private setCurrentLogFileData(logFileIndex: number) {
    const filePrefix = this.FILE_PREFIX ? `${this.FILE_PREFIX}-` : '';

    this.currentLogFileIndex = logFileIndex;
    this.currentLogFileDestination = `${
      this.LOG_DIRECTORY_DESTINATION
    }/${filePrefix}${getCurrentDate()}_${this.currentLogFileIndex}.log`;
  }

  private initFolder(): void {
    if (!existsSync(this.LOG_DIRECTORY_DESTINATION)) {
      mkdirSync(this.LOG_DIRECTORY_DESTINATION);
    }
  }

  private initLogFileName(): void {
    const lastLogFileName: string | undefined = this.getLastLogFileName();

    if (!lastLogFileName) {
      this.setCurrentLogFileData(this.currentLogFileIndex);

      return;
    }

    const lastFileIndex = getFileIndex(lastLogFileName);

    this.setCurrentLogFileData(Number(lastFileIndex));
  }

  private getLastLogFileName(): string | undefined {
    const currentDate = getCurrentDate();
    const fileDataList = [];

    readdirSync(this.LOG_DIRECTORY_DESTINATION).forEach((entity) => {
      if (!entity.includes(currentDate) || !entity.includes(this.FILE_PREFIX)) {
        return;
      }

      const entityDestination = `${this.LOG_DIRECTORY_DESTINATION}/${entity}`;
      const isFile = lstatSync(entityDestination).isFile();

      if (isFile) {
        fileDataList.push(entity);
      }
    });

    if (fileDataList.length < 1) {
      return;
    } else if (fileDataList.length === 1) {
      return fileDataList[0];
    }

    fileDataList.sort((a: string, b: string) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });

    return fileDataList[fileDataList.length - 1];
  }
}

function getCurrentDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function getFileIndex(fileName: string): number {
  const underscore = fileName.lastIndexOf('_');
  const dotIndex = fileName.indexOf('.');

  return Number(fileName.slice(underscore + 1, dotIndex));
}
