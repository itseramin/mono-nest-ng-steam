import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'steam-playground',
      synchronize: true,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    }),
    UsersModule,
    InventoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
