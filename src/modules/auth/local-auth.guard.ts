import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any, _info: any) {
    if (err || !user) {
      throw new UnauthorizedException({
        error: 'Unauthorized',
        statusCode: 401,
      });
    }
    return user;
  }
}
