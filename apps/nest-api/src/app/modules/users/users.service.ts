import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  async registerUser(profile: any): Promise<User> {
    let user = new User();
    user.steamId64 = profile.id;
    user.username = profile.displayName;
    user.steamPfp = profile.photos[1].value;
    user.role = 0;

    return await this.usersRepository.save(user);
  }

  findUsersTopThree(): Promise<User[]> {
    return this.usersRepository.findUsersTopThree();
  }

  findUserBySteamId64(steamId64: string): Promise<User> {
    return this.usersRepository.findUserBySteamId64(steamId64);
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findUserById(id);
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
}
