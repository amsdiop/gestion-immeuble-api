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
  Unique,
} from 'typeorm';
import { Immeuble } from './Immeuble.entity';
import { Bien } from './Biens.entity';

@Entity('etages')
@Unique('uk_immeuble_numero', ['immeuble_id', 'numero'])
@Index('idx_immeuble', ['immeuble_id'])
export class Etage {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  immeuble_id: number;

  @Column({ type: 'int' })
  numero: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Immeuble, (immeuble) => immeuble.etages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'immeuble_id' })
  immeuble: Immeuble;

  @OneToMany(() => Bien, (bien) => bien.etage, { cascade: true })
  biens: Bien[];
}
