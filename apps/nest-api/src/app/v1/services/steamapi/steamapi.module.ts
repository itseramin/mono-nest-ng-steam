import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SteamAPIService } from './steamapi.service';

@Module({
  exports: [SteamAPIService],
  imports: [HttpModule],
  providers: [SteamAPIService],
})
export class SteamAPIModule {}
