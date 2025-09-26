// src/scripts/my-script.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import UnitsSeeder from '@database/seeds/units.seeder';
import typeorm from '@config/typeorm';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Your custom script logic here, e.g., database seeding, data migration, etc.
  console.log('Running Seeders!');
  const seeders = [UnitsSeeder];
  const dataSource = app.get(DataSource);
  for (const seeder of seeders) {
    const seederClass = new seeder();
    await seederClass.run(dataSource);
  }
  await app.close();
}

bootstrap();
