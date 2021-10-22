import { Controller, Get, Res, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SteamAuthGuard } from './guards/steam-auth.guard';

import { AuthService } from './auth.service';

import { User } from '../modules/users/entities/user.entity';
import { ReqUser } from '../decorators/requser.paramdecorator';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('steam')
  @UseGuards(SteamAuthGuard)
  steamLogin() {}

  @Get('steam/return')
  @UseGuards(SteamAuthGuard)
  async steamLoginCallback(@ReqUser() user: User, @Res() res) {
    const token = await this.authService.login(user);

    // TODO: logic if user doesnt return token (already registered from same IP)

    res.redirect(
      `http://localhost:4200/auth/callback/?token=${token.JWTToken}`
    );
  }
}
