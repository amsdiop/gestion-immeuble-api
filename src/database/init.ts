import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    const dbName = process.env.DB_NAME || 'immeuble';
    // Only create database if it doesn't exist - preserve existing data
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' initialized (existing data preserved)`);
  } finally {
    await connection.end();
  }
}
