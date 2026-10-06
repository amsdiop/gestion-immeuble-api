import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  Unique,
} from 'typeorm';
import { Immeuble } from './Immeuble.entity';
import { Bien } from './Bien.entity';

@Entity('etages')
@Unique(['immeuble_id', 'numero'])
@Index(['immeuble_id'])
export class Etage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  immeuble_id: number;

  @Column()
  numero: number;

  @Column({ nullable: true })
  nom: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Immeuble, (immeuble) => immeuble.etages, {
    onDelete: 'CASCADE',
  })
  immeuble: Immeuble;

  @OneToMany(() => Bien, (bien) => bien.etage, { cascade: true })
  biens: Bien[];
}
