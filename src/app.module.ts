import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow<DataSourceOptions>('typeorm'),
    }),
    // TypeOrmModule.forRoot({
    //   type: dataSourceOptions.type, // Specify the database type
    //   host: dataSourceOptions.host, // Get variable from .env here,
    //   port: dataSourceOptions.port,
    //   username: dataSourceOptions.username,
    //   password: dataSourceOptions.password,
    //   database: dataSourceOptions.database,
    //   synchronize: dataSourceOptions.synchronize, // Note: only for development
    //   migrations: dataSourceOptions.migrations,
    //   autoLoadEntities: true
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
