const { createPool } = require('mysql2/promise');
// const HOST_DB = 'pma.ct8.pl';
// const NAME_DB = 'm35341_dziennik';
// const USER_DB = 'm35341_dawid';
// const PASS_DB = 'Admin1@';

const HOST_DB = 'localhost';
const NAME_DB = 'dziennik';
const USER_DB = 'root';
const PASS_DB = '';
const { createAccountsTable, createRoot} = require('./dbCreator');


const pool = createPool({
  host: HOST_DB,
  user: USER_DB,
  password: PASS_DB,
  namedPlaceholders: true,
  decimalNumbers: true,
});

(async () => {
  try {
    const [rows] = await pool.query('SHOW DATABASES');
    const databases = rows.map((row) => row.Database);
      if (!databases.includes(NAME_DB)) {
        await pool.query(`CREATE DATABASE ${NAME_DB}`);
      }
        await pool.query(`USE ${NAME_DB}`);
        const tables = [createAccountsTable, createRoot];
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
