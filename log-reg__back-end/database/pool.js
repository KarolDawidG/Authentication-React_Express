const { createPool } = require("mysql2/promise");
const { hostDB, userDB, passDB } = require("../config/configENV");

const pool = createPool({
  host: hostDB,
  user: userDB,
  password: passDB,
  namedPlaceholders: true,
  decimalNumbers: true,
});

module.exports = {
  pool,
};
