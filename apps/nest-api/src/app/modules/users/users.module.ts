import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([User, UsersRepository])],
  providers: [UsersService],
})
export class UsersModule {}
