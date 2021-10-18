import {
  Controller,
  Get,
  Post,
  Body,
  Header,
  Patch,
  Param,
  Req,
  Res,
  Delete,
  UseGuards,
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
  async steamLoginCallback(@Req() req, @Res() res) {
    const token = await this.authService.login(req.user);
    console.log(req.user, token);
    res.redirect(
      `http://localhost:4200/auth/callback/?token=${token.JWTToken}`
    );
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  validateByJWT() {
    return 'nice';
  }
}
