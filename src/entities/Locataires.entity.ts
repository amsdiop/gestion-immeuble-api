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
} from 'typeorm';
import { User } from './User.entity';
import { Bail } from './Bail.entity';
import { Document } from './Document.entity';

@Entity('Locataire')
@Index('idx_users_id', ['users_id'])
export class Locataire {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  users_id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  typebiens_nom: string;

  @Column({ type: 'int', nullable: true })
  etages_id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  etages_nom: string;

  @Column({ type: 'int', nullable: true })
  biens_id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  biens_nom: string;

  @Column({ type: 'longblob', nullable: true })
  biens_photo: Buffer;

  @Column({ type: 'decimal', precision: 10, scale: 0, nullable: true })
  biens_loyer: number;

  @Column({ type: 'varchar', length: 15, nullable: true })
  titre_courtoisie: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  prenom: string;

  @Column({ type: 'varchar', length: 150 })
  nom: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  pin: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  profession: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  telephone: string;

  @Column({ type: 'longblob', nullable: true })
  photo: Buffer;

  @Column({ type: 'longblob', nullable: true })
  piece_identite_photo: Buffer;

  @Column({ type: 'longblob', nullable: true })
  signature: Buffer;

  @Column({ type: 'tinyint', default: 1 })
  actif: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.locataires, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'users_id', referencedColumnName: 'users_id' })
  user: User;

  @OneToMany(() => Bail, (bail) => bail.locataire, { cascade: true })
  baux: Bail[];

  @OneToMany(() => Document, (document) => document.locataire, {
    cascade: true,
  })
  documents: Document[];
}



