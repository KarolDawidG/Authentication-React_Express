require("dotenv").config();

module.exports = {
  hostDB: process.env.HOST_DB,
  nameDB: process.env.NAME_DB,
  userDB: process.env.USER_DB,
  passDB: process.env.PASS_DB,
};
