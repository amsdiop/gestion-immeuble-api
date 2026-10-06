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
import { Bail } from './Bail.entity';
import { Locataire } from './Locataires.entity';

@Entity('documents')
@Index('idx_bail', ['bail_id'])
@Index('idx_locataire', ['locataire_id'])
@Index('idx_type', ['type_document'])
export class Document {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  bail_id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  locataire_id: number;

  @Column({ type: 'varchar', length: 100 })
  type_document: string;

  @Column({ type: 'varchar', length: 200 })
  titre: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url_fichier: string;

  @Column({ type: 'bigint', nullable: true })
  taille_fichier: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  mime_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Bail, (bail) => bail.documents, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'bail_id' })
  bail: Bail;

  @ManyToOne(() => Locataire, (locataire) => locataire.documents, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'locataire_id' })
  locataire: Locataire;
}

