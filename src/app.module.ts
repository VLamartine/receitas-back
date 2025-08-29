import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { DataSourceOptions } from 'typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { UniqueConstraint } from '@utils/validators/unique/unique';

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
      useFactory: (configService: ConfigService) => {
        return configService.getOrThrow<DataSourceOptions>('typeorm');
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UniqueConstraint],
})
export class AppModule {}
