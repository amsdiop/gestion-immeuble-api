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
      "SELECT users_id, users_prenom, users_nom, LENGTH(users_photo) as photo_size FROM users WHERE users_id = 1"
    );
    console.log('User 1 data:', rows[0]);

    conn.end();
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
