import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

import { ItemCached } from '../entities/item-cached.entity';

@EntityRepository(ItemCached)
export class ItemCachedRepository extends Repository<ItemCached> {
  async getAllCachedItemsFromUser(user: User): Promise<ItemCached[]> {
    return await this.find({ user: user });
  }

  async deleteAllCachedItems(user: User) {
    return await this.delete({ user: user });
  }
  x;

  async saveFetchedCachedItems(items: ItemCached[]): Promise<ItemCached[]> {
    return await this.save(items);
  }
}
