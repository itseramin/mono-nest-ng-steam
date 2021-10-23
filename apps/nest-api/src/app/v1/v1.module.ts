import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { LoginModule } from './modules/logins/login.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'steam-playground',
      synchronize: true,
      // entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
      autoLoadEntities: true,
    }),
    AuthModule,
    InventoryModule,
    LoginModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class V1Module {}