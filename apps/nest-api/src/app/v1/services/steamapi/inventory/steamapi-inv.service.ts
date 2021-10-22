import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ItemCached } from '../../../modules/inventory/entities/item-cached.entity';
import { User } from '../../../modules/users/entities/user.entity';

import { Config } from './config';

@Injectable()
export class SteamAPIInvService {
  constructor(private readonly httpService: HttpService) {}

  public async getInventoryOfUser(user: User): Promise<any> {
    const url = `http://steamcommunity.com/profiles/${user.steamId64}/inventory/json/730/2/`;

    const data = (await lastValueFrom(this.httpService.get<any>(url))).data
      .rgDescriptions;

    const items: ItemCached[] = (<any>Object.values(data)).map((i) => {
      const item = new ItemCached();
      item.img = i.icon_url_large || i.icon_url;
      item.name = i.name;
      item.user = user;

      return item;
    });

    return items;
  }
}
