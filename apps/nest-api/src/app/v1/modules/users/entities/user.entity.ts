import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  DEFAULT = 'DEFAULT',
  PROMO = 'PROMO',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ default: 0 })
  balance: number;

  //   @OneToMany(type => Item, item => item.owner)
  //   items: Item[];

  //   @OneToMany(type => Login, login => login.user)
  //   logins: Login[]; // IP bans, Geofencing,

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.DEFAULT,
  })
  role: UserRole;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ nullable: true })
  tradeUrl?: string;

  @Column({ unique: true })
  steamId64: string;

  @Column()
  steamPfp: string;

  @CreateDateColumn()
  registeredAt: Date;
}
