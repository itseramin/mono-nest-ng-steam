import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DateTime, Interval } from 'luxon';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SteamAPIService {
  private readonly BASE_URL = 'https://api.steampowered.com';
  private steamId: string = null;

  constructor(private readonly httpService: HttpService) {}

  public async canUserRegister(steamId: string): Promise<boolean> {
    this.steamId = steamId;

    if (await this.isUserProfilePrivateAndTooNew()) return false;

    if (await this.isUserTradeOrVACBanned()) return false;

    if (await this.isUserLevelBelow10()) return false;

    if (await this.isUserNotCSGOPlayer()) return false;

    return true;
  }

  private async isUserProfilePrivateAndTooNew(): Promise<boolean> {
    const url = `${this.BASE_URL}/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${this.steamId}`;

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
      ).length('years') < 2
    );
  }

  private async isUserTradeOrVACBanned(): Promise<boolean> {
    const url = `${this.BASE_URL}/ISteamUser/GetPlayerBans/v1/?key=${process.env.STEAM_API_KEY}&steamids=${this.steamId}`;

    const data = (await lastValueFrom(this.httpService.get<any>(url))).data; // retard Valve lmao where response property
    if (!data) return true;

    const user = data.players[0];

    return user.CommunityBanned || user.VACBanned || user.EconomyBan !== 'none';
  }

  private async isUserLevelBelow10(): Promise<boolean> {
    const url = `${this.BASE_URL}/IPlayerService/GetSteamLevel/v1/?key=${process.env.STEAM_API_KEY}&steamid=${this.steamId}`;

    const data = (await lastValueFrom(this.httpService.get<any>(url))).data
      .response;
    if (!data) return true;

    return data.player_level <= 10;
  }

  private async isUserNotCSGOPlayer(): Promise<boolean> {
    const url = `${this.BASE_URL}/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${this.steamId}&include_played_free_games=1&include_appinfo=0`;

    const data = (await lastValueFrom(this.httpService.get<any>(url))).data
      .response;
    if (!data) return true;

    if (data.game_count <= 0) return true;

    let csgo = data.games.filter((game) => game.appid === 730)[0];
    if (!csgo) return true;

    return csgo.playtime_forever < 30000;
  }
}
