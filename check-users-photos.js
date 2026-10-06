const mysql = require('mysql2/promise');

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: 'diopserveur',
      user: 'amsdiop',
      password: '@MSd4500',
      database: 'myimmeubles'
    });

    const [rows] = await conn.execute(
      'SELECT users_id, users_prenom, users_nom, LENGTH(users_photo) as photo_size FROM users WHERE users_photo IS NOT NULL'
    );

    console.log('Users avec photos:');
    rows.forEach(r => {
      console.log(`  User ${r.users_id}: ${r.users_prenom} ${r.users_nom} - ${r.photo_size} bytes`);
    });

    conn.end();
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
