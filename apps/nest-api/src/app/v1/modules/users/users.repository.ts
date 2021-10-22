import { EntityRepository, Repository } from 'typeorm';

import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findUserById(id: string): Promise<User> {
    return await this.findOne(id);
  }

  async findUserBySteamId64(steamId64: string): Promise<User> {
    return await this.findOne({ steamId64: steamId64 });
  }
}
