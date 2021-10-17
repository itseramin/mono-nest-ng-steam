import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';

import { AuthService } from '../auth.service';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {
    super({
      returnURL: 'http://localhost:3000/api/v1/auth/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: `${process.env.STEAM_API_KEY}`,
    });
  }

  async validate(identifier: any, profile: any, done: any): Promise<any> {
    const user = await this.authService.validateUser(identifier, profile, done);
    if (!user) {
      return done(null, await this.usersService.registerUser(profile));
    }
    return done(null, user);
  }
}
