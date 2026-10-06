import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/User.entity';
import { Immeuble } from '../entities/Immeuble.entity';
import { Etage } from '../entities/Etages.entity';
import { Bien } from '../entities/Biens.entity';
import { Locataire } from '../entities/Locataires.entity';
import { Bail } from '../entities/Bail.entity';
import { Paiement } from '../entities/Paiement.entity';
import { Document } from '../entities/Document.entity';
import { Maintenance } from '../entities/Maintenance.entity';
import { Notification } from '../entities/Notification.entity';
import { Depense } from '../entities/Depense.entity';
import { TitreCourtoisie } from '../entities/TitreCourtoisie.entity';
import { Abonnement } from '../entities/Abonnement.entity';
import { InviteAccesImmeuble } from '../entities/InviteAccesImmeuble.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'immeuble',
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  logger: 'advanced-console',
  entities: [
    User,
    Immeuble,
    Etage,
    Bien,
    Locataire,
    Bail,
    Paiement,
    Document,
    Maintenance,
    Notification,
    Depense,
    TitreCourtoisie,
    Abonnement,
    InviteAccesImmeuble,
  ],
  migrations: ['dist/database/migrations/*.js'],
  subscribers: ['src/database/subscribers/**/*.ts'],
});

export async function initializeDataSource() {
  try {
    await AppDataSource.initialize();
    console.log('âœ… Database connection established');
    return AppDataSource;
  } catch (error) {
    console.error('âŒ Database connection failed:', error);
    process.exit(1);
  }
}

