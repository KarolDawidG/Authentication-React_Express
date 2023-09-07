const { createPool } = require('mysql2/promise');
const {hostDB, nameDB, userDB, passDB} = require('../config/configENV');
const { createAccountsTable, createRoot, deleteAccount, eventSchedulerON} = require('./dbCreator');

const pool = createPool({
  host: hostDB,
  user: userDB,
  password: passDB,
  namedPlaceholders: true,
  decimalNumbers: true,
});

(async () => {
  try {
    const [rows] = await pool.query('SHOW DATABASES');
    const databases = rows.map((row) => row.Database);
      if (!databases.includes(nameDB)) {
        await pool.query(`CREATE DATABASE ${nameDB}`);
      }
        await pool.query(`USE ${nameDB}`);
        const tables = [createAccountsTable, createRoot, deleteAccount, eventSchedulerON];
      for await (const table of tables) {
        await table(pool);
      }console.log('Database started correctly');
  } catch (err) {
    console.error(err);
  }
})();

module.exports = {
  pool,
};
