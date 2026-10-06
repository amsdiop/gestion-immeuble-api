import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Immeuble } from './Immeuble.entity';

@Entity('invites_acces_immeubles')
@Index('fk_invite_user', ['invites_users_id'])
@Index('fk_invite_immeuble', ['immeuble_id'])
export class InviteAccesImmeuble {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  invites_users_id: number;

  @Column({ type: 'bigint', unsigned: true })
  immeuble_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.inviteAcces, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invites_users_id', referencedColumnName: 'users_id' })
  user: User;

  @ManyToOne(() => Immeuble, (immeuble) => immeuble.inviteAcces, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'immeuble_id' })
  immeuble: Immeuble;
}
