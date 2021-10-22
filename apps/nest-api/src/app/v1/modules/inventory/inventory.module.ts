import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SteamAPIInvService } from '../../services/steamapi/inventory/steamapi-inv.service';

import { InventoryController } from './inventory.controller';

@Module({
  controllers: [InventoryController],
  exports: [],
  imports: [HttpModule],
  providers: [SteamAPIInvService],
})
export class InventoryModule {}
