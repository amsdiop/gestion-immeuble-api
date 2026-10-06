import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

export enum NotificationType {
  PAIEMENT_RECU = 'PAIEMENT_RECU',
  PAIEMENT_EN_ATTENTE = 'PAIEMENT_EN_ATTENTE',
  BAIL_EXPIRE = 'BAIL_EXPIRE',
  RAPPEL_PAIEMENT = 'RAPPEL_PAIEMENT',
  MAINTENANCE = 'MAINTENANCE',
  AUTRE = 'AUTRE',
}

@Entity('notifications')
@Index('idx_utilisateur', ['users_id'])
@Index('idx_lue', ['lue'])
@Index('idx_created_at', ['created_at'])
@Index('idx_utilisateur_lue', ['users_id', 'lue'])
export class Notification {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  users_id: number;

  @Column({ type: 'enum', enum: NotificationType, default: NotificationType.AUTRE })
  type: NotificationType;

  @Column({ type: 'varchar', length: 150 })
  titre: string;

  @Column({ type: 'longtext', nullable: true })
  message: string;

  @Column({ type: 'tinyint', default: 0 })
  lue: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'users_id', referencedColumnName: 'users_id' })
  user: User;
}
