import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Res,
  Delete,
  UseGuards,
  Redirect,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SteamAuthGuard } from './guards/steam-auth.guard';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('steam')
  @UseGuards(SteamAuthGuard)
  steamLogin() {}

  @Get('steam/return')
  @UseGuards(SteamAuthGuard)
  async steamLoginCallback(@Request() req, @Res() res) {
    console.log(req.user, await this.authService.login(req.user));
    res.redirect('/');
  }
}
