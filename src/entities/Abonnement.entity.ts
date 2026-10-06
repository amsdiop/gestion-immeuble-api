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

export enum AbonnementStatut {
  ACTIF = 'actif',
  SUSPENDU = 'suspendu',
  EXPIRE = 'expire',
}

@Entity('abonnements')
@Index('fk_comptes_abonnement_comptes_idx', ['users_id'])
export class Abonnement {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  users_id: number;

  @Column({ type: 'date' })
  date_debut: Date;

  @Column({ type: 'date' })
  date_fin: Date;

  @Column({ type: 'enum', enum: AbonnementStatut, default: AbonnementStatut.ACTIF })
  statut: AbonnementStatut;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  montant_paye: number;

  @Column({ type: 'varchar', length: 50, comment: 'ex: Wave, Orange Money, Carte' })
  mode_paiement: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.abonnements, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'users_id', referencedColumnName: 'users_id' })
  user: User;
}
