const { createPool } = require('mysql2/promise');
const {hostDB, nameDB, userDB, passDB} = require('../config/configENV');
const { createAccountsTable, createRoot, deleteAccount, eventSchedulerON, createQuiz} = require('./dbCreator');

const pool = createPool({
  host: hostDB,
  user: userDB,
  password: passDB,
  database: nameDB,
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
        const tables = [createAccountsTable, createRoot, deleteAccount, eventSchedulerON, createQuiz];
      for await (const table of tables) {
        await table(pool);
      } console.log('Database started correctly');
  } catch (err) {
     console.error(err);
  }
})();

module.exports = {
  pool,
};
