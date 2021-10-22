import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity()
export class Login {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, (user) => user.logins)
  user: User;

  @Index()
  @Column({ nullable: false })
  ip: string;

  @Column({ nullable: false })
  countryCode: string;

  @CreateDateColumn()
  date: Date;
}
