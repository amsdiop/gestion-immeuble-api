import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Bail } from './Bail.entity';

export enum PaiementMode {
  ESPECES = 'ESPECES',
  PISPI = 'PISPI',
  ORANGE_MONEY = 'ORANGE_MONEY',
  WAVE = 'WAVE',
  VIREMENT = 'VIREMENT',
}

export enum PaiementStatut {
  EN_ATTENTE = 'EN_ATTENTE',
  PAYE = 'PAYE',
  REJETE = 'REJETE',
  ANNULE = 'ANNULE',
  PARTIEL = 'PARTIEL',
}

@Entity('paiements')
@Unique('uk_bail_periode', ['bail_id', 'periode'])
@Index('idx_bail', ['bail_id'])
@Index('idx_periode', ['periode'])
@Index('idx_statut', ['statut'])
@Index('idx_date_paiement', ['date_paiement'])
@Index('idx_bail_statut', ['bail_id', 'statut'])
export class Paiement {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  bail_id: number;

  @Column({ type: 'char', length: 7 })
  periode: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  bien_nom: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montant: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  montant_en_lettre: string;

  @Column({ type: 'enum', enum: PaiementMode })
  mode: PaiementMode;

  @Column({ type: 'enum', enum: PaiementStatut, default: PaiementStatut.EN_ATTENTE })
  statut: PaiementStatut;

  @Column({ type: 'varchar', length: 120, nullable: true })
  reference_externe: string;

  @Column({ type: 'longtext', nullable: true })
  photo: string;

  @Column({ type: 'date', nullable: true })
  date_paiement: Date;

  @Column({ type: 'longtext', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Bail, (bail) => bail.paiements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bail_id' })
  bail: Bail;
}
