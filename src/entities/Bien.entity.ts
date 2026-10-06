import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Immeuble } from './Immeuble.entity';
import { Etage } from './Etage.entity';
import { Bail } from './Bail.entity';
import { Maintenance } from './Maintenance.entity';

@Entity('biens')
@Index(['immeuble_id'])
@Index(['etage_id'])
export class Bien {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  immeuble_id: number;

  @Column()
  etage_id: number;

  @Column({ unique: true })
  reference: string;

  @Column()
  designation: string;

  @Column()
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

  @Column({ type: 'decimal', precision: 10, scale: 0, nullable: true })
  montant_ht: number;

  @Column({ type: 'decimal', precision: 10, scale: 0, nullable: true })
  montant_tva: number;

  @Column({ type: 'decimal', precision: 10, scale: 0, nullable: true })
  loyer: number;

  @Column({ default: 1 })
  actif: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Immeuble, (immeuble) => immeuble.etages, {
    onDelete: 'CASCADE',
  })
  immeuble: Immeuble;

  @ManyToOne(() => Etage, (etage) => etage.biens, { onDelete: 'CASCADE' })
  etage: Etage;

  @OneToMany(() => Bail, (bail) => bail.bien, { cascade: true })
  baux: Bail[];

  @OneToMany(() => Maintenance, (maintenance) => maintenance.bien, {
    cascade: true,
  })
  maintenances: Maintenance[];
}
