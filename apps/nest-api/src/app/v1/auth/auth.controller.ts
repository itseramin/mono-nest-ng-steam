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
  steamLoginCallback(@ReqUser() user: User, @Res() res) {
    this.authService.handleLogin(user, res);
  }
}
