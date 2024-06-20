require('dotenv').config();
const { createPool } = require("mysql2/promise");

const pool = createPool({
  host: process.env.HOST_DB || 'localhost',
  user: process.env.USER_DB || 'root',
  database: process.env.NAME_DB || 'dziennik',
  password: process.env.PASS_DB || 'password',
  namedPlaceholders: true,
  decimalNumbers: true,
});

module.exports = {
  pool,
};



// const { createPool } = require("mysql2/promise");

// const pool = createPool({
//   host: 'mysql',          // or localhost if you dont use docker
//   user: 'root',
//   database: 'dziennik',
//   password: '',           // or try this password: password if Docker Off
//   namedPlaceholders: true,
//   decimalNumbers: true,
// });

// module.exports = {
//   pool,
// };
