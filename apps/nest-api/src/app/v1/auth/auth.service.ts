import { Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';

import { UsersService } from '../modules/users/users.service';
import { User } from '../modules/users/entities/user.entity';
import { UsersRepository } from '../modules/users/users.repository';

@Injectable()
export class AuthService {
  private usersRepository: UsersRepository;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly connection: Connection
  ) {
    this.usersRepository = this.connection.getCustomRepository(UsersRepository);
  }

  async steamValidation(profile: any): Promise<User | null> {
    return (
      (await this.usersService.findUserBySteamId64(profile.id)) ??
      (await this.usersService.registerUser(profile))
    );
  }

  async jwtValidation(id: string): Promise<User> {
    return await this.usersRepository.findUserById(id);
  }

  handleLogin(user: User, res: any) {
    if (!user) {
      res.redirect(`http://localhost:4200/auth/requirementsnotmet`);
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
