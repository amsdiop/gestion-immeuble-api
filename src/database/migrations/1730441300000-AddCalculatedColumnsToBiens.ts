import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCalculatedColumnsToBiens1730441300000 implements MigrationInterface {
  name = 'AddCalculatedColumnsToBiens1730441300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Changer photo de longtext à longblob
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `photo` longblob NULL');

    // Ajouter pu (prix unitaire)
    await queryRunner.addColumn(
      'biens',
      new TableColumn({
        name: 'pu',
        type: 'decimal',
        precision: 10,
        scale: 2,
        isNullable: true,
        comment: 'Prix unitaire',
      })
    );

    // Ajouter dispo (disponibilité)
    await queryRunner.addColumn(
      'biens',
      new TableColumn({
        name: 'dispo',
        type: 'tinyint',
        default: 1,
        isNullable: false,
        comment: 'Disponibilité du bien (1=disponible, 0=non-disponible)',
      })
    );

    // Ajouter caution
    await queryRunner.addColumn(
      'biens',
      new TableColumn({
        name: 'caution',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
        isNullable: false,
        comment: 'Montant de la caution (garantie séparate, non incluse dans loyer)',
      })
    );

    // Ajouter nettoyage
    await queryRunner.addColumn(
      'biens',
      new TableColumn({
        name: 'nettoyage',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
        isNullable: false,
        comment: 'Frais de nettoyage inclus dans loyer',
      })
    );

    // Ajouter security
    await queryRunner.addColumn(
      'biens',
      new TableColumn({
        name: 'security',
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
        isNullable: false,
        comment: 'Frais de sécurité inclus dans loyer',
      })
    );

    // Ajouter montant_ht (GENERATED COLUMN)
    // montant_ht = (pu × taux_marge) × (1 - taux_reduction)
    await queryRunner.query(
      `ALTER TABLE \`biens\` ADD COLUMN \`montant_ht\` DECIMAL(10,2)
       GENERATED ALWAYS AS ((COALESCE(\`pu\`,0) * COALESCE(\`taux_marge\`,0)) * (1 - COALESCE(\`taux_reduction\`,0))) STORED
       COMMENT 'Montant hors taxes (calculé automatiquement)'`
    );

    // Ajouter montant_tva (GENERATED COLUMN)
    // montant_tva = montant_ht × taux_tva
    await queryRunner.query(
      `ALTER TABLE \`biens\` ADD COLUMN \`montant_tva\` DECIMAL(10,2)
       GENERATED ALWAYS AS (COALESCE(\`montant_ht\`,0) * COALESCE(\`taux_tva\`,0)) STORED
       COMMENT 'Montant TVA (calculé automatiquement)'`
    );

    // Modifier la colonne loyer pour être GENERATED COLUMN
    // D'abord supprimer la colonne existante
    await queryRunner.dropColumn('biens', 'loyer');

    // Ensuite ajouter la nouvelle colonne calculée
    // loyer = montant_ht + montant_tva + nettoyage + security
    await queryRunner.query(
      `ALTER TABLE \`biens\` ADD COLUMN \`loyer\` DECIMAL(12,2)
       GENERATED ALWAYS AS (
         COALESCE(\`montant_ht\`,0) +
         COALESCE(\`montant_tva\`,0) +
         COALESCE(\`nettoyage\`,0) +
         COALESCE(\`security\`,0)
       ) STORED
       COMMENT 'Loyer final = montant_ht + montant_tva + frais (calculé automatiquement)'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Inverser la migration
    await queryRunner.dropColumn('biens', 'loyer');
    await queryRunner.dropColumn('biens', 'montant_tva');
    await queryRunner.dropColumn('biens', 'montant_ht');
    await queryRunner.dropColumn('biens', 'security');
    await queryRunner.dropColumn('biens', 'nettoyage');
    await queryRunner.dropColumn('biens', 'caution');
    await queryRunner.dropColumn('biens', 'dispo');
    await queryRunner.dropColumn('biens', 'pu');

    // Restaurer photo
    await queryRunner.query('ALTER TABLE `biens` MODIFY COLUMN `photo` longtext NULL');

    // Restaurer loyer
    await queryRunner.addColumn(
      'biens',
      new TableColumn({
        name: 'loyer',
        type: 'decimal',
        precision: 12,
        scale: 2,
      })
    );
  }
}
