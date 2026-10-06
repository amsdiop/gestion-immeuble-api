const mysql = require('mysql2/promise');

async function testAuthLogic() {
  try {
    const connection = await mysql.createConnection({
      host: 'diopserveur',
      user: 'amsdiop',
      password: '@MSd4500',
      database: 'myimmeubles',
      port: 3306
    });

    const email = 'amsdiop@live.com';
    const pin = '4590';

    console.log(`Testing auth logic for email='${email}', pin='${pin}'`);

    // Step 1: Find compte
    console.log('\n1. Finding compte...');
    const [comptes] = await connection.execute(
      "SELECT * FROM comptes WHERE email = ?",
      [email]
    );

    if (comptes.length === 0) {
      console.log('❌ Compte not found');
      return;
    }

    const compte = comptes[0];
    console.log('✅ Compte found:');
    console.log('   ID:', compte.id);
    console.log('   Email:', compte.email);
    console.log('   PIN:', compte.pin);
    console.log('   Actif:', compte.actif);

    // Step 2: Verify PIN
    console.log('\n2. Verifying PIN...');
    if (compte.pin !== pin) {
      console.log(`❌ PIN mismatch! Expected '${pin}', got '${compte.pin}'`);
      return;
    }
    console.log('✅ PIN matches');

    if (!compte.actif) {
      console.log('❌ Compte not active');
      return;
    }
    console.log('✅ Compte is active');

    // Step 3: Find or create utilisateur
    console.log('\n3. Finding utilisateur...');
    const [utilisateurs] = await connection.execute(
      "SELECT * FROM utilisateurs WHERE compte_id = ? AND role = 'BAILLEUR'",
      [compte.id]
    );

    if (utilisateurs.length > 0) {
      console.log('✅ Utilisateur found:');
      console.log('   ID:', utilisateurs[0].id);
      console.log('   Email:', utilisateurs[0].email);
      console.log('   Role:', utilisateurs[0].role);
    } else {
      console.log('❌ Utilisateur not found - would create new one');
      console.log('   compte_id:', compte.id);
      console.log('   email:', compte.email);
      console.log('   nom:', compte.nom);
      console.log('   role: BAILLEUR');
    }

    console.log('\n✅ Auth logic simulation complete');

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  }
}

testAuthLogic();
