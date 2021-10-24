import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { LoginRepository } from './login.repository';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginRepository)
    private readonly loginRepository: LoginRepository
  ) {}

  async newLogin(loginData: any): Promise<Login> {
    return await this.loginRepository.save(loginData);
  }

  async getAllLoginsOfIp(ip: string): Promise<Login[]> {
    return await this.loginRepository.getSteamId64FromIp(ip);
  }
}
