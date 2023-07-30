const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { UsersRecord } = require("../../database/Records/UsersRecord");
const { verifyTokenAfterLogin, publicKey, privateKey, queryParameterize } = require('../../config/config');
const middleware = require('../../config/middleware');
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
const TOKEN_EXPIRATION_TIME = '1h';
const router = express.Router();
router.use(middleware);


router.get('/', verifyTokenAfterLogin, (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(STATUS_CODES.UNAUTHORIZED).send(MESSAGES.USER_NOT_LOGGED_IN);
  }

  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (error, decoded) => {
    if (error) {
      logger.error(error.message);
      return res.status(STATUS_CODES.UNAUTHORIZED).send(MESSAGES.SESSION_EXPIRED);
    } else {
      return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
    }
  });
});

router.post("/", async (req, res) => {
  try {
    const user = req.body.username;
    const password = req.body.password;

    if (!user || !password) {
      return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.USERNAME_PASSWORD_REQUIRED);
    }

    if (!user.match(queryParameterize)) {
      return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.SQL_INJECTION);
    }

    const ifUser = await UsersRecord.selectByUsername([user]);
    
    if (ifUser.length === 0) {
      return res.status(STATUS_CODES.UNAUTHORIZED).send(MESSAGES.WRONG_USERNAME);
    }

    const hashedPassword = ifUser[0].password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return res.status(STATUS_CODES.UNAUTHORIZED).send(MESSAGES.WRONG_PASSWORD);
    }

    const rola = ifUser[0].role;
    logger.info(`Logged in user: ${user}, access level: ${rola}`);
    const token = generateToken(user, rola);
    return res.status(STATUS_CODES.SUCCESS).json({ token: token, message: `${MESSAGES.SUCCESSFUL_OPERATION}` });
    
  } catch (error) {
    logger.error(error.message);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});

const generateToken = (username, role) => {
  const payload = {
    user: username,
    role: role,
    exp: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXPIRATION_TIME.split('h')[0]) * 60 * 60
  };
  return jwt.sign(payload, privateKey, { algorithm: "RS256" });
}

module.exports = router;
