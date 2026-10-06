const mysql = require('mysql2/promise');

async function checkDB() {
  try {
    const connection = await mysql.createConnection({
      host: 'diopserveur',
      user: 'amsdiop',
      password: '@MSd4500',
      database: 'myimmeubles',
      port: 3306
    });

    console.log('Checking utilisateurs table:');
    const [rows] = await connection.execute(
      "SELECT * FROM utilisateurs"
    );

    console.log('Total utilisateurs:', rows.length);
    rows.forEach(row => {
      console.log(row);
    });

    // Check utilisateurs for compte_id = 1
    console.log('\nChecking utilisateurs with compte_id = 1:');
    const [rows2] = await connection.execute(
      "SELECT * FROM utilisateurs WHERE compte_id = 1"
    );
    console.log('Count:', rows2.length);
    rows2.forEach(row => {
      console.log(row);
    });

    // Show table structure
    console.log('\nTable structure:');
    const [cols] = await connection.execute("DESCRIBE utilisateurs");
    cols.forEach(col => {
      console.log(`  - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''} ${col.Key ? 'KEY:' + col.Key : ''}`);
    });

    // Show indexes
    console.log('\nIndexes:');
    const [indexes] = await connection.execute("SHOW INDEXES FROM utilisateurs");
    indexes.forEach(idx => {
      console.log(`  - ${idx.Key_name}: ${idx.Column_name}`);
    });

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkDB();
