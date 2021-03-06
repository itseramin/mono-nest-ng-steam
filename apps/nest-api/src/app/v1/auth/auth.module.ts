import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SteamStrategy } from './strategies/steam.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../modules/users/users.service';
import { SteamAPIAuthService } from '../services/steamapi/steamapi-auth.service';
import { SteamAPIInvService } from '../services/steamapi/steamapi-inv.service';
import { UsersRepository } from '../modules/users/users.repository';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' }, // TODO: logic for refresh tokens
    }),
  ],
  providers: [
    UsersRepository,
    AuthService,
    UsersService,
    SteamAPIAuthService,
    SteamAPIInvService,
    JwtStrategy,
    SteamStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
