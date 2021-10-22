import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SteamAPIInvService } from '../../services/steamapi/inventory/steamapi-inv.service';
import { Login } from './entities/login.entity';
import { LoginRepository } from './login.repository';
import { LoginService } from './login.service';

@Module({
  exports: [TypeOrmModule],
  imports: [TypeOrmModule.forFeature([Login, LoginRepository])],
  providers: [LoginService, SteamAPIInvService],
})
export class LoginModule {}
