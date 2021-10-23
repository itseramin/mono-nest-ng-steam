import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DateTime, Interval } from 'luxon';
import { lastValueFrom } from 'rxjs';

import { Config } from './config';

@Injectable()
export class SteamAPIAuthService {
  private steamId: string = null;

  constructor(private readonly httpService: HttpService) {}

  public async canUserRegister(steamId: string): Promise<boolean> {
    this.steamId = steamId;

    if (await this.isUserAccounPrivateOrTooNew()) return false;

    if (await this.isUserAccountTradeOrVACBanned()) return false;

    if (await this.isUserAccountLevelBelowLimit()) return false;

    if (await this.isUserNotGamePlayer()) return false;

    return true;
  }

  private async isUserAccounPrivateOrTooNew(): Promise<boolean> {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${this.steamId}`;

    const data = (await lastValueFrom(this.httpService.get<any>(url))).data
      .response;
    if (!data) return true;

    const user = data.players[0];
    if (!user) return true;

    return (
      user.communityvisibilitystate < 3 ||
      Interval.fromDateTimes(
        DateTime.fromSeconds(user.timecreated),
        DateTime.now()
      ).length('years') < Config.MIN_ACCOUNT_AGE
    );
  }

  private async isUserAccountTradeOrVACBanned(): Promise<boolean> {
    const url = `https://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${process.env.STEAM_API_KEY}&steamids=${this.steamId}`;

    const data = (await lastValueFrom(this.httpService.get<any>(url))).data; // retard Valve lmao where response property
    if (!data) return true;

    const user = data.players[0];

    return user.CommunityBanned || user.VACBanned || user.EconomyBan !== 'none';
  }

  private async isUserAccountLevelBelowLimit(): Promise<boolean> {
    const url = `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${process.env.STEAM_API_KEY}&steamid=${this.steamId}`;

    const data = (await lastValueFrom(this.httpService.get<any>(url))).data
      .response;
    if (!data) return true;

    return data.player_level <= Config.MIN_ACCOUNT_LVL;
  }

  private async isUserNotGamePlayer(): Promise<boolean> {
    const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${this.steamId}&include_played_free_games=1&include_appinfo=0`;

    const data = (await lastValueFrom(this.httpService.get<any>(url))).data
      .response;
    if (!data) return true;

    if (data.game_count <= 0) return true;

    const game = data.games.filter(
      (game) => game.appid === Config.GAME_APPID
    )[0];
    if (!game) return true;

    return game.playtime_forever < Config.MIN_GAME_HOURS * 60;
  }
}
