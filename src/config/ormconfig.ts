import { ConfigService } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';

config();

const commonConfig = {
  synchronize: false,
  migrations: [__dirname + './../migrations/**/*{.ts,.js}'],
  entities: [__dirname + './../**/*.entity{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
};

export const getTypeormOptions = async (
  configService: ConfigService,
): Promise<DataSourceOptions> => {
  return {
    type: 'postgres',
    port: configService.get('DB_PORT'),
    host: configService.get('DB_HOST'),
    username: configService.get('DB_USER_NAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    ...commonConfig,
  };
};

export const ormConfig = {
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...commonConfig,
};

export default new DataSource({ ...ormConfig, type: 'postgres' });
