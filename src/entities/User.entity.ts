import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Immeuble } from './Immeuble.entity';
import { Locataire } from './Locataires.entity';
import { Notification } from './Notification.entity';
import { Abonnement } from './Abonnement.entity';
import { InviteAccesImmeuble } from './InviteAccesImmeuble.entity';

export enum UserRole {
  ADMIN = 'ADMIN',
  BAILLEUR = 'BAILLEUR',
  LOCATAIRE = 'LOCATAIRE',
  INVITE = 'INVITE',
}

@Entity('users')
@Index('idx_email', ['users_email'])
@Index('idx_actif', ['users_actif'])
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  users_id: number;

  @Column({ type: 'varchar', length: 190, unique: true })
  users_email: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  users_pin: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  users_prenom: string;

  @Column({ type: 'varchar', length: 120 })
  users_nom: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  users_telephone: string;

  @Column({ type: 'varchar', length: 255 })
  users_mot_de_passe_hash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.INVITE })
  users_role: UserRole;

  @Column({ type: 'longblob', nullable: true })
  users_signature: Buffer;

  @Column({ type: 'longblob', nullable: true })
  users_photo: Buffer;

  @Column({ type: 'tinyint', default: 1 })
  users_actif: number;

  @CreateDateColumn()
  users_created_at: Date;

  @UpdateDateColumn()
  users_updated_at: Date;

  @Column({ type: 'bigint', nullable: true })
  users_proprietaire_rattache_id: number;

  // Relations
  @OneToMany(() => Immeuble, (immeuble) => immeuble.user, { cascade: true })
  immeubles: Immeuble[];

  @OneToMany(() => Locataire, (locataire) => locataire.user, { cascade: true })
  locataires: Locataire[];

  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
  })
  notifications: Notification[];

  @OneToMany(() => Abonnement, (abonnement) => abonnement.user, {
    cascade: true,
  })
  abonnements: Abonnement[];

  @OneToMany(
    () => InviteAccesImmeuble,
    (inviteAcces) => inviteAcces.user,
    { cascade: true }
  )
  inviteAcces: InviteAccesImmeuble[];
}

