import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SteamAPIInvService } from '../../services/steamapi/inventory/steamapi-inv.service';
import { UsersRepository } from '../users/users.repository';
import { ItemCached } from './entities/item-cached.entity';
import { Item } from './entities/item.entity';

import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ItemCachedRepository } from './repositories/item-cached.repository';

@Module({
  controllers: [InventoryController],
  exports: [TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Item, ItemCached, ItemCachedRepository]),
    HttpModule,
  ],
  providers: [InventoryService, SteamAPIInvService, UsersRepository],
})
export class InventoryModule {}
