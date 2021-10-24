import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { getClientIp } from 'request-ip';

import { User } from '../modules/users/entities/user.entity';
import { UsersRepository } from '../modules/users/users.repository';
import { UsersService } from '../modules/users/users.service';

import { SteamAPIAuthService } from '../services/steamapi/steamapi-auth.service';

@Injectable()
export class AuthService {
  private usersRepository: UsersRepository;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly steamAPIAuthService: SteamAPIAuthService,
    private readonly connection: Connection
  ) {
    this.usersRepository = this.connection.getCustomRepository(UsersRepository);
  }

  async steamValidation(req: any, profile: any): Promise<User | null> {
    let user = await this.usersService.findUserBySteamId64(profile.id);
    if (!user) {
      if (!(await this.steamAPIAuthService.canUserRegister(profile.id))) {
        return null;
      }

      // TODO: Add IP/geo ban check and login logging here
      console.log(getClientIp(req));

      user = await this.usersService.registerUser(profile);
    }

    return user;
  }

  async jwtValidation(id: string): Promise<User> {
    return await this.usersRepository.findUserById(id);
  }

  handleLogin(user: User, res: any) {
    if (!user) {
      res.redirect('http://localhost:4200/auth/requirementsnotmet');
      return;
    }

    const payload = {
      sub: user.id,
      steamId64: user.steamId64,
      role: user.role,
    };
    const JWTToken = this.jwtService.sign(payload);

    res.redirect(`http://localhost:4200/auth/callback/?token=${JWTToken}`);
  }
}
