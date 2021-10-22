import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Connection } from 'typeorm';

import { UsersRepository } from '../../modules/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private usersRepository: UsersRepository;
  constructor(private readonly connection: Connection) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
    this.usersRepository = this.connection.getCustomRepository(UsersRepository);
  }

  async validate(payload: any) {
    return await this.usersRepository.findUserById(payload.sub); // TODO: sophisticated method in authservice
  }

  // handleRequest(err, user, info: Error) {
  //   // TODO: custom 401 error when unauthenticated
  //   return user;
  // }
}
