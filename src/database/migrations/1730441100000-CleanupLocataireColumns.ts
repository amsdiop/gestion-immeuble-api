import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CleanupLocataireColumns1730441100000 implements MigrationInterface {
  name = 'CleanupLocataireColumns1730441100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Locataire', 'email');
    await queryRunner.dropColumn('Locataire', 'piece_identite');
    await queryRunner.dropColumn('Locataire', 'numero_piece');
    await queryRunner.dropColumn('Locataire', 'photo_url');
    await queryRunner.dropColumn('Locataire', 'piece_identite_type');
    await queryRunner.dropColumn('Locataire', 'piece_identite_numero');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Locataire',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        length: '190',
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      'Locataire',
      new TableColumn({
        name: 'piece_identite',
        type: 'varchar',
        length: '100',
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      'Locataire',
      new TableColumn({
        name: 'numero_piece',
        type: 'varchar',
        length: '50',
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      'Locataire',
      new TableColumn({
        name: 'photo_url',
        type: 'varchar',
        length: '255',
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      'Locataire',
      new TableColumn({
        name: 'piece_identite_type',
        type: 'varchar',
        length: '50',
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      'Locataire',
      new TableColumn({
        name: 'piece_identite_numero',
        type: 'varchar',
        length: '50',
        isNullable: true,
      })
    );
  }
}

