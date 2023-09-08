const express = require('express');
const {UsersRecord} = require("../../database/Records/UsersRecord");
const bcrypt = require("bcrypt");
const {JWT_CONFIRMED_TOKEN} = require('../../config/configENV');
const jwt = require('jsonwebtoken');
const middleware = require("../../config/middleware");
const {errorHandler} = require('../../config/config');
const router = express.Router();
const MESSAGES = require('../../config/messages');
const URL = require('../../config/url');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
const {  validatePassword, validateUserName, validateEmail } = require("../../config/config");
const {sendRegisterEmail} = require('../../config/emailSender');


router.use(middleware);
router.use(errorHandler);

router.post('/', async (req, res) => {
    const { email, username, password } = req.body;
    let idActivation = '';

    if (!validateEmail(email)) {
      return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.INVALID_EMAIL);
    }

    if (!validatePassword(password)) {
        return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.INVALID_PASS);
    }

    if (!validateUserName(username)) {
      logger.info(MESSAGES.INCORRECT_USERNAME);
      return res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.INCORRECT_USERNAME);
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
        }

        if (userExists.emailExists && userExists.emailExists.length > 0) {
            return res.status(STATUS_CODES.FORBIDDEN).send(MESSAGES.EMAIL_EXIST);
        }

        if (userExists.loginExists && userExists.loginExists.length > 0) {
            return res.status(STATUS_CODES.FORBIDDEN).send(MESSAGES.USER_EXIST);
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        await UsersRecord.insert([username, hashPassword, email]);

        const [emailExists] = await UsersRecord.selectByEmail([email]);
        idActivation = emailExists?.id;
      
       const activationToken = jwt.sign({ userId: idActivation }, JWT_CONFIRMED_TOKEN, { expiresIn: '5m' });
      
       const link = `${URL.REGISTER_URL}${activationToken}`;

        await sendRegisterEmail(email, username, link);
        
        logger.info(MESSAGES.SUCCESSFUL_SIGN_UP);
        return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_SIGN_UP);
      } catch (error) {
        logger.error(error.message);
        return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
      }
    } 
  );

  router.get("/:token", async (req, res) => {
    const { token } = req.params;
    try {
      jwt.verify(token, JWT_CONFIRMED_TOKEN, async (err, decoded) => {
        if (err) {
          return res.status(STATUS_CODES.UNAUTHORIZED).send(MESSAGES.JWT_ERROR);
        }
  
        const id = decoded.userId;
        await UsersRecord.activateAccount(id);
        
        return res.redirect(URL.URL_LOGIN);
      });
    } catch (error) {
      logger.error(`Server error: ${error.message}`);
      return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
  });

module.exports = router;

