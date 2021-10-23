import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ReqUser } from '../../decorators/requser.paramdecorator';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findUsersTopTree() {
    return 'yes';
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async findOne(@ReqUser() user: User): Promise<User> {
    return this.usersService.findUserById(user.id);
  }
}
