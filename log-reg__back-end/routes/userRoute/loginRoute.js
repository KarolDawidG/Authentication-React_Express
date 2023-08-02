const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { UsersRecord } = require("../../database/Records/UsersRecord");
const { queryParameterize } = require('../../config/config');
const { SECRET_REFRESH_TOKEN, generateRefreshToken, generateToken} = require('../../config/tokenUtils');
const middleware = require('../../config/middleware');
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
const router = express.Router();
router.use(middleware);


router.get('/', (req, res) => {
      return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
  });
  router.get('/refresh', (req, res) => {
    return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
});

router.post("/", async (req, res) => {
  try {
    const user = req.body.username;
    const password = req.body.password;

    if (!user || !password) {
      return res.status(STATUS_CODES.UNPROCESSABLE_ENTITY).send(MESSAGES.UNPROCESSABLE_ENTITY);
    }

    if (!user.match(queryParameterize)) {
      return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.SQL_INJECTION_ALERT);
    }

    const ifUser = await UsersRecord.selectByUsername([user]);
    
    if (ifUser.length === 0) {
      return res.status(401).send(MESSAGES.WRONG_USERNAME);
    }

    const hashedPassword = ifUser[0].password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return res.status(STATUS_CODES.UNAUTHORIZED).send(MESSAGES.WRONG_PASSWORD);
    }

    const rola = ifUser[0].role;
    logger.info(`Logged in user: ${user}, access level: ${rola}`);

    const token = generateToken(user, rola);
    const refreshToken = generateRefreshToken(user);

     return res.status(STATUS_CODES.SUCCESS).json({ token: token, refreshToken: refreshToken, message: MESSAGES.SUCCESSFUL_SIGN_UP });
    
  } catch (error) {
    logger.error(error.message);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.INTERNET_DISCONNECTED);
  }
});

router.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Brak refresh tokena' });
  }
  jwt.verify(refreshToken, SECRET_REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Nieprawidłowy refresh token' });
    }
    const username = decoded.user;
    const newToken = generateToken(username);
    const refreshToken = generateRefreshToken(username);
    return res.json({ token: newToken, refreshToken: refreshToken });
  });
});

module.exports = router;