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
import { Immeuble } from './Immeuble.entity';

@Entity('depenses')
@Index('idx_immeuble', ['immeuble_id'])
@Index('idx_type', ['type_depense'])
@Index('idx_date', ['date_depense'])
export class Depense {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  immeuble_id: number;

  @Column({ type: 'varchar', length: 100 })
  type_depense: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  montant: number;

  @Column({ type: 'date' })
  date_depense: Date;

  @Column({ type: 'longtext', nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Immeuble, (immeuble) => immeuble.depenses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'immeuble_id' })
  immeuble: Immeuble;
}
