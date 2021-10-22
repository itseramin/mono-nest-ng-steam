import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { Config } from './config';

@Injectable()
export class SteamAPIInvService {
  constructor(private readonly httpService: HttpService) {}

  public async getInventoryOfUser(steamId: string): Promise<any> {
    const url = `http://steamcommunity.com/profiles/${steamId}/inventory/json/730/2/`;

    const data = (await lastValueFrom(this.httpService.get<any>(url))).data
      .rgDescriptions;

    return data;
  }
}
