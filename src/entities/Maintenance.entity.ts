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
import { Bien } from './Biens.entity';

export enum MaintenanceStatut {
  SIGNALE = 'SIGNALE',
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE',
  ANNULE = 'ANNULE',
}

export enum MaintenancePriorite {
  BASSE = 'BASSE',
  NORMALE = 'NORMALE',
  HAUTE = 'HAUTE',
  URGENTE = 'URGENTE',
}

@Entity('maintenance')
@Index('idx_bien', ['bien_id'])
@Index('idx_statut', ['statut'])
@Index('idx_priorite', ['priorite'])
@Index('idx_date_debut', ['date_debut'])
export class Maintenance {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  bien_id: number;

  @Column({ type: 'varchar', length: 200 })
  titre: string;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: MaintenanceStatut, default: MaintenanceStatut.SIGNALE })
  statut: MaintenanceStatut;

  @Column({ type: 'enum', enum: MaintenancePriorite, default: MaintenancePriorite.NORMALE })
  priorite: MaintenancePriorite;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  cout_estime: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  cout_reel: number;

  @Column({ type: 'date', nullable: true })
  date_debut: Date;

  @Column({ type: 'date', nullable: true })
  date_fin: Date;

  @Column({ type: 'longtext', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Bien, (bien) => bien.maintenances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bien_id' })
  bien: Bien;
}
