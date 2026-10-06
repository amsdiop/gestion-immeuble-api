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
import { Bien } from './Biens.entity';
import { Locataire } from './Locataires.entity';
import { Paiement } from './Paiement.entity';
import { Document } from './Document.entity';

export enum BailStatut {
  BROUILLON = 'BROUILLON',
  ACTIF = 'ACTIF',
  TERMINE = 'TERMINE',
  RESILIE = 'RESILIE',
}

@Entity('baux')
@Unique('reference', ['baux_reference'])
@Index('idx_bien', ['baux_bien_id'])
@Index('idx_locataire', ['baux_locataire_id'])
@Index('idx_statut', ['baux_statut'])
@Index('idx_date_debut', ['baux_date_debut'])
@Index('idx_locataire_statut', ['baux_locataire_id', 'baux_statut'])
export class Bail {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  baux_id: number;

  @Column({ type: 'bigint', unsigned: true })
  baux_bien_id: number;

  @Column({ type: 'bigint', unsigned: true })
  baux_locataire_id: number;

  @Column({ type: 'varchar', length: 80 })
  baux_reference: string;

  @Column({ type: 'date' })
  baux_date_debut: Date;

  @Column({ type: 'date', nullable: true })
  baux_date_fin: Date;

  @Column({ type: 'tinyint', unsigned: true, default: 5 })
  jour_echeance: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  baux_caution: number;

  @Column({ type: 'varchar', length: 45, default: 'Contrat de Location' })
  baux_Titre: string;

  @Column({ type: 'longtext', nullable: true })
  baux_Dune_Part: string;

  @Column({ type: 'longtext', nullable: true })
  baux_Dautre_Part: string;

  @Column({ type: 'longtext', nullable: true })
  baux_Art_1_Loyer: string;

  @Column({ type: 'longtext', nullable: true })
  baux_Art_2_Duree: string;

  @Column({ type: 'longtext', nullable: true })
  baux_Art_3_Charges_et_Conditions: string;

  @Column({ type: 'longtext', nullable: true })
  baux_Art_4_Entregistrement: string;

  @Column({ type: 'longtext', nullable: true })
  baux_Art_5_Modalites_paiement: string;

  @Column({ type: 'longtext', nullable: true })
  baux_Art_6_Manquement: string;

  @Column({ type: 'longtext', nullable: true })
  baux_Art_7_Election_de_Domicile: string;

  @Column({ type: 'date', nullable: true })
  baux_DateElaborationContrat: Date;

  @Column({ type: 'date', nullable: true })
  baux_prend_effet_a_compter_du: Date;

  @Column({ type: 'longtext', nullable: true })
  baux_Art_8_Fait_a_Dakar_Le: string;

  @Column({ type: 'longblob', nullable: true })
  baux_Art_9_Signatures_Bailleurs: Buffer;

  @Column({ type: 'longblob', nullable: true })
  baux_Art_10_Signatures_Preneur: Buffer;

  @Column({ type: 'longtext', nullable: true })
  baux_photo_Locataire: string;

  @Column({ type: 'enum', enum: BailStatut, default: BailStatut.BROUILLON })
  baux_statut: BailStatut;

  @CreateDateColumn()
  baux_created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Bien, (bien) => bien.baux, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'baux_bien_id' })
  bien: Bien;

  @ManyToOne(() => Locataire, (locataire) => locataire.baux, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'baux_locataire_id' })
  locataire: Locataire;

  @OneToMany(() => Paiement, (paiement) => paiement.bail, { cascade: true })
  paiements: Paiement[];

  @OneToMany(() => Document, (document) => document.bail, { cascade: true })
  documents: Document[];
}

