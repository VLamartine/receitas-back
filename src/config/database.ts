import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const DATABASE_HOST = process.env.DB_HOST;
const DATABASE_NAME = process.env.DB_NAME;
const DATABASE_USERNAME = process.env.DB_USER;
const DATABASE_PASSWORD = process.env.DB_PASSWORD;

if (
  !DATABASE_HOST ||
  !DATABASE_NAME ||
  !DATABASE_USERNAME ||
  !DATABASE_PASSWORD
) {
  throw new Error('Banco de dados não configurado. Cheque o arquivo .env\n');
}

export default registerAs('database', () => ({
  host: DATABASE_HOST,
  port: 5432,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
}));
