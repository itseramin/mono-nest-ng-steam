import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DateTime, Interval } from 'luxon';

import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { ItemCached } from './entities/item-cached.entity';
import { ItemCachedRepository } from './repositories/item-cached.repository';

import { SteamAPIInvService } from '../../services/steamapi/steamapi-inv.service';

import { Error, ResponseBase } from '@mono-nest-ng-steam/dtos';

@Injectable()
export class InventoryService {
  private itemCachedRepository: ItemCachedRepository;
  private usersRepository: UsersRepository;

  constructor(
    private readonly connection: Connection,
    private readonly steamAPIINVService: SteamAPIInvService
  ) {
    this.itemCachedRepository =
      this.connection.getCustomRepository(ItemCachedRepository);
    this.usersRepository = this.connection.getCustomRepository(UsersRepository);
  }

  async getInventoryOfUser(user: User): Promise<ItemCached[]> {
    return await this.itemCachedRepository.getAllCachedItemsFromUser(user);
  }

  async fetchInventoryOfUser(user: User): Promise<ResponseBase> {
    const res = new ResponseBase();
    res.err = new Error();

    if (user.lastInvFetch) {
      const minutesFromLastTime = Interval.fromDateTimes(
        DateTime.fromJSDate(user.lastInvFetch),
        DateTime.now()
      ).length('minutes');

      if (minutesFromLastTime < 5) {
        res.err.code = 'inventory_fetch_time';
        res.err.message = 'Try again in 5 minutes...';
        return res;
      }
    }

    let items = await this.steamAPIINVService.getInventoryOfUser(user);
    if (!items) {
      res.err.code = 'inventory_fetch_steamapi';
      res.err.message = 'Steam API error...';
      return res;
    }

    await this.itemCachedRepository.deleteAllCachedItems(user);

    items = await this.itemCachedRepository.saveFetchedCachedItems(items);
    if (!items) {
      res.err.code = 'inventory_fetch_db';
      res.err.message = 'Cannot update items in db...';

      return res;
    }

    await this.usersRepository.update(user.id, { lastInvFetch: new Date() });
    res.err = null;

    return res;
  }
}
