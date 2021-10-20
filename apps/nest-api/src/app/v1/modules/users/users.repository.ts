import { EntityRepository, Repository } from 'typeorm';

import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  findUserById(id: string) {
    return this.findOne(id);
  }

  findUserBySteamId64(steamId64: string) {
    return this.findOne({ steamId64: steamId64 });
  }

  findUsersTopThree() {
    return this.find({
      order: {
        balance: 'ASC',
      },
      take: 3,
    });
  }
}
