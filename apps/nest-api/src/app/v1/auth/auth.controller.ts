import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

import { SteamAuthGuard } from './guards/steam-auth.guard';

import { AuthService } from './auth.service';
import { ReqUser } from '../decorators/requser.paramdecorator';
import { User } from '../modules/users/entities/user.entity';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('steam')
  @UseGuards(SteamAuthGuard)
  steamLogin() {} // Calls Steam strategy

  @Get('steam/return')
  @UseGuards(SteamAuthGuard)
  steamLoginCallback(@ReqUser() user: User | null, @Res() res) {
    this.authService.handleLogin(user, res);
  }
}
