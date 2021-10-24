import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { LoginModule } from './modules/logins/login.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'steam-playground',
      autoLoadEntities: true,
      synchronize: true, // You would want to do migrations of the DataBase in production mode
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
