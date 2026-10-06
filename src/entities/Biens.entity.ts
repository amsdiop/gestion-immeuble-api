import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
  Generated,
} from 'typeorm';
import { Immeuble } from './Immeuble.entity';
import { Etage } from './Etages.entity';
import { Bail } from './Bail.entity';
import { Maintenance } from './Maintenance.entity';

@Entity('biens')
@Index('idx_immeuble_id', ['immeuble_id'])
@Index('idx_etage_id', ['etage_id'])
export class Bien {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  immeuble_id: number;

  @Column({ type: 'bigint', unsigned: true })
  etage_id: number;

  @Column({ type: 'varchar', length: 80, unique: true })
  reference: string;

  @Column({ type: 'varchar', length: 150 })
  designation: string;

  @Column({ type: 'varchar', length: 60 })
  type_bien: string;

  @Column({ type: 'longblob', nullable: true })
  photo: Buffer;

  @Column({ type: 'decimal', precision: 10, scale: 0, nullable: true })
  pu: number;

  @Column({ type: 'tinyint', default: 1 })
  dispo: number;

  @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
  caution: number;

  @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
  nettoyage: number;

  @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
  security: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taux_tva: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taux_marge: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taux_remise: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  taux_reduction: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    generatedType: 'STORED',
    asExpression: '((coalesce(\pu\,0) * coalesce(\	aux_marge\,0)) * (1 - coalesce(\	aux_reduction\,0)))',
  })
  montant_ht: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    generatedType: 'STORED',
    asExpression: '(coalesce(\montant_ht\,0) * coalesce(\	aux_tva\,0))',
  })
  montant_tva: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 0,
    generatedType: 'STORED',
    asExpression: '(((coalesce(\montant_ht\,0) + coalesce(\montant_tva\,0)) + coalesce(\
ettoyage\,0)) + coalesce(\security\,0))',
  })
  loyer: number;

  @Column({ type: 'tinyint', default: 1 })
  actif: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Immeuble, (immeuble) => immeuble.biens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'immeuble_id' })
  immeuble: Immeuble;

  @ManyToOne(() => Etage, (etage) => etage.biens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'etage_id' })
  etage: Etage;

  @OneToMany(() => Bail, (bail) => bail.bien, { cascade: true })
  baux: Bail[];

  @OneToMany(() => Maintenance, (maintenance) => maintenance.bien, {
    cascade: true,
  })
  maintenances: Maintenance[];
}
