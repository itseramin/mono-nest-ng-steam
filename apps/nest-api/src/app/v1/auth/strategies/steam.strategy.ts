import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';

import { AuthService } from '../auth.service';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      returnURL: 'http://localhost:3000/api/v1/auth/steam/return', // TODO: .env file maybe or dynamic config depending on build type(?)
      realm: 'http://localhost:3000/',
      apiKey: `${process.env.STEAM_API_KEY}`,
    });
  }

  async validate(identifier: any, profile: any, done: any): Promise<any> {
    return await this.authService.steamValidation(profile);
  }
}
