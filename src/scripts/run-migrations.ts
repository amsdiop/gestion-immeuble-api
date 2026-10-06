import { AppDataSource, initializeDataSource } from '../database/data-source';

async function runMigrations() {
  try {
    await initializeDataSource();

    console.log('🔄 Running pending migrations...');
    await AppDataSource.runMigrations();
    console.log('✅ All migrations executed successfully');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

runMigrations();
