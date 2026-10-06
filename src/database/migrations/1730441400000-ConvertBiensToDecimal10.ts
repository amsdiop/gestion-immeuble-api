import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertBiensToDecimal101730441400000 implements MigrationInterface {
  name = 'ConvertBiensToDecimal101730441400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Convertir les colonnes de decimal(10,2) à decimal(10,0) - Francs CFA (pas de centimes)
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `pu` decimal(10,0) NULL');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `caution` decimal(10,0) NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `nettoyage` decimal(10,0) NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `security` decimal(10,0) NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `montant_ht` decimal(10,0) NULL');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `montant_tva` decimal(10,0) NULL');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `loyer` decimal(10,0) NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Inverser: revenir à decimal(10,2)
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `pu` decimal(10,2) NULL');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `caution` decimal(10,2) NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `nettoyage` decimal(10,2) NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `security` decimal(10,2) NOT NULL DEFAULT 0');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `montant_ht` decimal(10,2) NULL');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `montant_tva` decimal(10,2) NULL');
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `loyer` decimal(12,2) NULL');
  }
}
