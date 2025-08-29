import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfig from './database';

dotenvConfig();

const db = dbConfig();

const config: DataSourceOptions = {
  type: 'postgres' as const,
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  synchronize: false,
};

export default registerAs('typeorm', () => ({
  ...config,
  autoLoadEntities: true,
}));
export const connectionSource = new DataSource(config);
