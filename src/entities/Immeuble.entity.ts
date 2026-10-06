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
import { Etage } from './Etages.entity';
import { Bien } from './Biens.entity';
import { Depense } from './Depense.entity';
import { InviteAccesImmeuble } from './InviteAccesImmeuble.entity';

@Entity('immeubles')
@Index('idx_compte', ['users_id'])
@Index('idx_actif', ['actif'])
export class Immeuble {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  users_id: number;

  @Column({ type: 'varchar', length: 150 })
  nom: string;

  @Column({ type: 'varchar', length: 255 })
  adresse: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ville: string;

  @Column({ type: 'tinyint', default: 1 })
  actif: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.immeubles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'users_id', referencedColumnName: 'users_id' })
  user: User;

  @OneToMany(() => Etage, (etage) => etage.immeuble, { cascade: true })
  etages: Etage[];

  @OneToMany(() => Bien, (bien) => bien.immeuble, { cascade: true })
  biens: Bien[];

  @OneToMany(() => Depense, (depense) => depense.immeuble, { cascade: true })
  depenses: Depense[];

  @OneToMany(
    () => InviteAccesImmeuble,
    (inviteAcces) => inviteAcces.immeuble,
    { cascade: true }
  )
  inviteAcces: InviteAccesImmeuble[];
}
