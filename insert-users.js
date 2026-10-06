const mysql = require('mysql2/promise');

async function insertUsers() {
  const connection = await mysql.createConnection({
    host: 'diopserveur',
    user: 'amsdiop',
    password: '@MSd4500',
    database: 'myimmeubles'
  });

  try {
    const sql = `
      INSERT INTO users (users_email, users_pin, users_nom, users_prenom, users_role, users_actif, users_mot_de_passe_hash)
      VALUES
        ('amadou@example.com', '4590', 'Diop', 'Amadou', 'ADMIN', 1, 'hash1'),
        ('jacob@example.com', '1234', 'Diop', 'Jacob', 'BAILLEUR', 1, 'hash2')
      ON DUPLICATE KEY UPDATE users_pin = VALUES(users_pin);
    `;

    const [result] = await connection.execute(sql);
    console.log('✅ Users inserted/updated:', result);

    // Verify inserted users
    const [rows] = await connection.execute('SELECT users_id, users_email, users_pin, users_nom, users_role FROM users');
    console.log('📋 Current users:', rows);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await connection.end();
  }
}

insertUsers();
