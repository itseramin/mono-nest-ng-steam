import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../modules/users/users.service';
import { User } from '../modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser(profile: any): Promise<any> {
    return (
      (await this.usersService.findUserBySteamId64(profile.id)) ??
      (await this.usersService.registerUser(profile))
    );
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      steamId64: user.steamId64,
      role: user.role,
    };
    return {
      JWTToken: this.jwtService.sign(payload),
    };
  }
}
