const { createPool } = require("mysql2/promise");

const pool = createPool({
  host: 'mysql',
  user: 'root',
  database: 'dziennik',
  password: '',
  namedPlaceholders: true,
  decimalNumbers: true,
});

module.exports = {
  pool,
};
