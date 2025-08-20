import {DataSource, DataSourceOptions} from "typeorm";
import process from "node:process";
import * as dotenv from "dotenv";
import * as path from "node:path";
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres', // Specify the database type
  host: process.env.DB_HOST || '', // Get variable from .env here,
  port: 5432,
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  entities: [/* your entities here */],
  synchronize: false, // Note: only for development
  migrations: [path.join(__dirname, "/migrations/*{.ts,.js}")],
}
export default new DataSource(dataSourceOptions);
