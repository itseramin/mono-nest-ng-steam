import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    identifier: string,
    profile: any,
    done: any
  ): Promise<any> {
    const user = await this.usersService.findUserBySteamId64(profile.id);
    if (user && user.steamId64 === profile.id) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      steamId64: user.steamId64,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
