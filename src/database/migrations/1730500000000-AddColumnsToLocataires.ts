import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsToLocataire1730500000000 implements MigrationInterface {
  name = 'AddColumnsToLocataire1730500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('Locataire');
    if (!tableExists) return;

    await queryRunner.query(`ALTER TABLE \`Locataire\` ADD COLUMN IF NOT EXISTS \`etages_id\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`Locataire\` ADD COLUMN IF NOT EXISTS \`etages_nom\` varchar(45) NULL`);
    await queryRunner.query(`ALTER TABLE \`Locataire\` ADD COLUMN IF NOT EXISTS \`typebiens_nom\` varchar(45) NULL`);
    await queryRunner.query(`ALTER TABLE \`Locataire\` ADD COLUMN IF NOT EXISTS \`biens_id\` int NULL`);
    await queryRunner.query(`ALTER TABLE \`Locataire\` ADD COLUMN IF NOT EXISTS \`biens_nom\` varchar(45) NULL`);
    await queryRunner.query(`ALTER TABLE \`Locataire\` ADD COLUMN IF NOT EXISTS \`biens_photo\` longblob NULL`);
    await queryRunner.query(`ALTER TABLE \`Locataire\` ADD COLUMN IF NOT EXISTS \`biens_loyer\` decimal(10,0) NULL`);
    await queryRunner.query(`ALTER TABLE \`Locataire\` ADD COLUMN IF NOT EXISTS \`prenom\` varchar(200) NULL`);
    await queryRunner.query(`ALTER TABLE \`Locataire\` ADD COLUMN IF NOT EXISTS \`profession\` varchar(45) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Locataire', 'profession');
    await queryRunner.dropColumn('Locataire', 'prenom');
    await queryRunner.dropColumn('Locataire', 'biens_loyer');
    await queryRunner.dropColumn('Locataire', 'biens_photo');
    await queryRunner.dropColumn('Locataire', 'biens_nom');
    await queryRunner.dropColumn('Locataire', 'biens_id');
    await queryRunner.dropColumn('Locataire', 'typebiens_nom');
    await queryRunner.dropColumn('Locataire', 'etages_nom');
    await queryRunner.dropColumn('Locataire', 'etages_id');
  }
}

