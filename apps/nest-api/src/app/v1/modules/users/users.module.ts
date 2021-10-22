import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

import { SteamAPIInvService } from '../../services/steamapi/inventory/steamapi-inv.service';

@Module({
  controllers: [UsersController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User, UsersRepository]), HttpModule],
  providers: [UsersService, SteamAPIInvService],
})
export class UsersModule {}
