import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertToLongblob1730441200000 implements MigrationInterface {
  name = 'ConvertToLongblob1730441200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `Locataire` MODIFY COLUMN `photo` longblob NULL');
    await queryRunner.query('ALTER TABLE `Locataire` MODIFY COLUMN `signature` longblob NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `Locataire` MODIFY COLUMN `photo` longtext NULL');
    await queryRunner.query('ALTER TABLE `Locataire` MODIFY COLUMN `signature` longtext NULL');
  }
}

