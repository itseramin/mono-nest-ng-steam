import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

import { SteamAPIAuthService } from '../../services/steamapi/steamapi-auth.service';

@Module({
  controllers: [UsersController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User, UsersRepository]), HttpModule],
  providers: [UsersService, SteamAPIAuthService],
})
export class UsersModule {}
