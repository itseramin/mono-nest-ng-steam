import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';
import { User } from '../../modules/users/entities/user.entity';

import { AuthService } from '../auth.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      returnURL: 'http://localhost:3000/api/v1/auth/steam/return', // TODO: .env file maybe or dynamic config depending on build type(?)
      realm: 'http://localhost:3000/',
      apiKey: `${process.env.STEAM_API_KEY}`,
      passReqToCallback: true, // Neat trick to pass down the request
    });
  }

  async validate(
    req: any,
    identifier: any,
    profile: any,
    done: any
  ): Promise<User | null> {
    return await this.authService.steamValidation(req, profile);
  }
}
