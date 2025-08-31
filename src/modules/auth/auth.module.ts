import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '@modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@modules/auth/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@modules/auth/jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          expiresIn: '7d',
        };
      },
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

//
