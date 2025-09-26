import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfig from './database';
import { SeederOptions } from 'typeorm-extension';
import process from 'node:process';

dotenvConfig();

const db = dbConfig();

const basePath = process.env.ENV === 'development' ? 'src' : 'dist';
const config: DataSourceOptions & SeederOptions = {
  type: 'postgres' as const,
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [`${__dirname}/..//**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
  synchronize: false,
  seeds: [`${__dirname}/../database/seeds/*{.ts,.js}`],
};

console.log(config);
export default registerAs('typeorm', () => ({
  ...config,
  autoLoadEntities: true,
}));
export const connectionSource = new DataSource(config);
