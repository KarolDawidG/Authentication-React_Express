const express = require('express');
const {UsersRecord} = require("../../database/Records/UsersRecord");
const bcrypt = require("bcrypt");
const middleware = require("../../config/middleware");
const router = express.Router();
const { queryParameterize, validateEmail } = require('../../config/config');
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
router.use(middleware);

router.get('/', async (req, res) =>{
    try{
        logger.info(MESSAGES.SUCCESSFUL_OPERATION);
        return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
    } catch (error) {
        logger.error(error.message);
        return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
});

router.post('/', async (req, res) => {
    const { email, username, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.INVALID_EMAIL);
    }

    if (!username.match(queryParameterize)) {
      logger.info(MESSAGES.SQL_INJECTION_ALERT);
      return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.SQL_INJECTION_ALERT);
    }

      try {
        const userExists = {
          emailExists: await UsersRecord.selectByEmail([email]),
          loginExists: await UsersRecord.selectByUsername([username]),
        };
  
        if (
          (userExists.emailExists && userExists.emailExists.length > 0) &&
          (userExists.loginExists && userExists.loginExists.length > 0)) {
          return res.status(STATUS_CODES.FORBIDDEN).send(MESSAGES.EMAIL_USER_EXIST);
        };

        if (userExists.emailExists && userExists.emailExists.length > 0) {
            return res.status(STATUS_CODES.FORBIDDEN).send(MESSAGES.EMAIL_EXIST);
        };

        if (userExists.loginExists && userExists.loginExists.length > 0) {
            return res.status(STATUS_CODES.FORBIDDEN).send(MESSAGES.USER_EXIST);
        } ;

        const hashPassword = await bcrypt.hash(password, 10);
        await UsersRecord.insert([username, hashPassword, email])
        logger.info(MESSAGES.SUCCESSFUL_SIGN_UP);
        return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_SIGN_UP);
          
      } catch (error) {
        logger.error(error.message);
        return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
      }
    } 
  );

module.exports = router;

