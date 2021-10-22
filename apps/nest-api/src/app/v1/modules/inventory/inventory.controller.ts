import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { ReqUser } from '../../decorators/requser.paramdecorator';
import { Roles } from '../../decorators/roles.decorator';

import { User, UserRole } from '../users/entities/user.entity';

import { SteamAPIInvService } from '../../services/steamapi/inventory/steamapi-inv.service';

@Controller({ path: 'inventory', version: '1' })
export class InventoryController {
  constructor(private readonly steamAPIInvServices: SteamAPIInvService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.DEFAULT)
  getInventoryOfUser(@ReqUser() user: User) {
    return this.steamAPIInvServices.getInventoryOfUser(user.steamId64);
  }
}
