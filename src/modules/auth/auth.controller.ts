import { Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import express from 'express';
import { LocalAuthGuard } from '@modules/auth/local-auth.guard';
import { AuthService } from '@modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: express.Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Req() req: express.Request, @Res() res: express.Response) {
    return req.logout(err => {
      if (err) {
        console.log('Erro no logout', err);
        return res.status(500).send('Erro no logout');
      }

      return res.status(200).send('Logout realizado com sucesso');
    });
  }
}
