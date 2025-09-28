import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from "@config/typeorm";
import { DataSourceOptions } from 'typeorm';
import { AuthModule } from '@modules/auth/auth.module';
import { UniqueConstraint } from '@utils/validators/unique/unique';
import { ProductModule } from '@modules/product/product.module';
import { ShoppingListModule } from '@modules/shopping-list/shopping-list.module';
import { UnitsModule } from '@modules/units/units.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ typeOrmConfig ],
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
    ProductModule,
    ShoppingListModule,
    UnitsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UniqueConstraint],
})
export class AppModule {}
