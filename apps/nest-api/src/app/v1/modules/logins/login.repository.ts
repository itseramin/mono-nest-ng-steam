import { EntityRepository, Repository } from 'typeorm';

import { Login } from './entities/login.entity';

@EntityRepository(Login)
export class LoginRepository extends Repository<Login> {
  getSteamId64FromIp(ip: string) {
    return this.find({ ip: ip });
  }
}
