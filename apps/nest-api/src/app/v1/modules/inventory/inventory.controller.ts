import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { ReqUser } from '../../decorators/requser.paramdecorator';
import { Roles } from '../../decorators/roles.decorator';

import { User, UserRole } from '../users/entities/user.entity';

import { InventoryService } from './inventory.service';

import { ResponseBase } from '@mono-nest-ng-steam/dtos';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'inventory', version: '1' })
export class InventoryController {
  constructor(private readonly inventoryServices: InventoryService) {}

  @Get()
  @Roles(UserRole.DEFAULT)
  getInventoryOfUser(@ReqUser() user: User) {
    return this.inventoryServices.getInventoryOfUser(user);
  }

  @Get('fetch')
  fetchInventoryOfUser(@ReqUser() user: User): Promise<ResponseBase> {
    return this.inventoryServices.fetchInventoryOfUser(user);
  }
}
