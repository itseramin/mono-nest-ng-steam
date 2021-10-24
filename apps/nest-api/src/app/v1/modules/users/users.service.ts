import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

import { User, UserRole } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  private usersRepository: UsersRepository;

  constructor(private readonly connection: Connection) {
    this.usersRepository = this.connection.getCustomRepository(UsersRepository);
  }

  async registerUser(profile: any): Promise<User> {
    let user = new User();
    user.steamId64 = profile.id;
    user.username = profile.displayName;
    user.steamPfp = profile.photos[1].value;
    user.role = UserRole.DEFAULT;

    return await this.usersRepository.save(user);
  }

  async findUserById(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async findUserBySteamId64(steamId64: string): Promise<User> {
    return await this.usersRepository.findUserBySteamId64(steamId64);
  }
}
