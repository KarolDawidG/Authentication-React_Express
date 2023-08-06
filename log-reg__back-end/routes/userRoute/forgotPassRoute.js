const express = require('express');
const jwt = require('jsonwebtoken');
const middleware = require("../../config/middleware");
const { UsersRecord } = require("../../database/Records/UsersRecord");
const router = express.Router();
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
const {sendResetPasswordEmail} = require('../../config/emailSender');
const {jwt_secret} = require('../../config/configENV');

router.use(middleware);

router.get('/', (req, res) => {
  return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
});

router.post('/', async (req, res) => {
    const { email } = req.body;
    let usernameReset = '';
    let idReset = '';
    let emailReset = '';
    let passwordReset = '';
    try {
        const [emailExists] = await UsersRecord.selectByEmail([email]);
           if (!emailExists || emailExists.length === 0) {
            return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.EMAIL_SUCCESS);
          }
            usernameReset = emailExists?.username;
            emailReset = emailExists?.email;
            idReset = emailExists?.id;
            passwordReset = emailExists?.password;
      } catch (error) {
        logger.error(error.message);
        res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
      }
      const secret = jwt_secret + passwordReset;
      const payload = {
          email: emailReset,
          id: idReset
      };
      const token = jwt.sign(payload, secret, { expiresIn: '1m' });
      const link = `http://localhost:3000/reset/${idReset}/${token}`;

      await sendResetPasswordEmail(emailReset, emailReset, link);

      try {
          logger.info(MESSAGES.EMAIL_SUCCESS);
          res.status(STATUS_CODES.SUCCESS).send(MESSAGES.EMAIL_SUCCESS);
      } catch (error) {
        logger.error(`Server error email route: ${error.message}`);
          res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
      }
  });

module.exports = router;
