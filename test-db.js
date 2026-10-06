const mysql = require('mysql2/promise');

async function testDB() {
  try {
    const connection = await mysql.createConnection({
      host: 'diopserveur',
      user: 'amsdiop',
      password: '@MSd4500',
      database: 'myimmeubles',
      port: 3306
    });

    console.log('✅ Connected to database');

    // Check comptes table
    const [rows] = await connection.execute(
      "SELECT id, email, nom, pin FROM comptes WHERE email = ?",
      ['amsdiop@live.com']
    );

    console.log('Query result:', rows);

    if (rows.length > 0) {
      console.log('✅ User found in comptes table:');
      rows.forEach(row => {
        console.log(`  - ID: ${row.id}, Email: ${row.email}, Nom: ${row.nom}, PIN: ${row.pin}`);
      });
    } else {
      console.log('❌ No user found with email amsdiop@live.com');

      // Show all comptes
      const [allRows] = await connection.execute("SELECT id, email, nom, pin FROM comptes");
      console.log('All comptes in database:');
      allRows.forEach(row => {
        console.log(`  - ID: ${row.id}, Email: ${row.email}, Nom: ${row.nom}, PIN: ${row.pin}`);
      });
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDB();
