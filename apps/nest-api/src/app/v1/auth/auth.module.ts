import { Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../modules/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SteamStrategy } from './strategies/steam.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from '../modules/users/users.service';
import { SteamAPIModule } from '../services/steamapi/steamapi.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    SteamAPIModule,
    JwtModule.register({
      secret: 'bigsecret',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService, SteamStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
