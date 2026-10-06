import { Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('titre_courtoisie')
export class TitreCourtoisie {
  @PrimaryColumn({ type: 'varchar', length: 15 })
  titre: string;

  @CreateDateColumn()
  created_at: Date;
}
