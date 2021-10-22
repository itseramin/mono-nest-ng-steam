import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  DEFAULT = 'DEFAULT',
  PROMO = 'PROMO',
}

import { ItemCached } from '../../inventory/entities/item-cached.entity';
import { Item } from '../../inventory/entities/item.entity';
import { Login } from '../../logins/entities/login.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  steamId64: string;

  @Column()
  username: string;

  @Column({ default: 0 })
  balance: number;

  @OneToMany((type) => Item, (item) => item.user)
  items: Item[];

  @Column({ nullable: true })
  tradeUrl: string;

  @OneToMany((type) => Login, (login) => login.user)
  logins: Login[];

  // @OneToMany((type) => LogSell, (logSell) => logSell.user)
  // logSell: LogSell[];

  @Column({ default: false })
  isBanned: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DEFAULT,
  })
  role: UserRole;

  @Column()
  steamPfp: string;

  @OneToMany((type) => ItemCached, (itemCached) => itemCached.user)
  itemsCached: ItemCached[];

  @Column({ nullable: true })
  lastInvFetch?: Date;

  @CreateDateColumn()
  registeredAt: Date;
}
