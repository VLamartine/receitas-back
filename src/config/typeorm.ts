import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfig from '@config/database';

dotenvConfig();

const db = dbConfig();

const config = {
  type: 'postgres' as const,
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

console.log(config);
console.log('Está aqui');
export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
