import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPieceIdentitePhoto1730441000000 implements MigrationInterface {
  name = 'AddPieceIdentitePhoto1730441000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Locataire',
      new TableColumn({
        name: 'piece_identite_type',
        type: 'varchar',
        length: '50',
        isNullable: true,
        comment: 'Type: CNI, PASSEPORT, CARTE_CONSULAIRE',
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

    await queryRunner.addColumn(
      'Locataire',
      new TableColumn({
        name: 'piece_identite_photo',
        type: 'longblob',
        isNullable: true,
        comment: 'Photo de la piÃ¨ce d\'identitÃ© en BLOB',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Locataire', 'piece_identite_photo');
    await queryRunner.dropColumn('Locataire', 'piece_identite_numero');
    await queryRunner.dropColumn('Locataire', 'piece_identite_type');
  }
}

