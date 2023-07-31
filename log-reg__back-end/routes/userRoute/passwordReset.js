const express = require('express');
const bcrypt = require('bcrypt');
const middleware = require("../../config/middleware");
const router = express.Router();
const { UsersRecord } = require("../../database/Records/UsersRecord");
const logger = require('../../logs/logger');
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
router.use(middleware);

router.get('/', async (req, res) => {
  try {
    return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
  } catch (error) {
    logger.error(error.message);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.ERROR_GET_CONNECTION);
  }
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = {
      emailExists: await UsersRecord.selectByEmail([email]),
    };

      if (!userExists.emailExists || userExists.emailExists.length === 0) {
          return res.status(STATUS_CODES.UNAUTHORIZED).send(MESSAGES.EMAIL_DOES_EXIST);
      }

      const hashPassword = await bcrypt.hash(password, 10);
      await UsersRecord.updatePasswordByEmail([hashPassword, email]);
      logger.info(MESSAGES.SUCCESSFUL_RESET);
      return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_RESET);
    
  } catch (error) {
        logger.error(error.message);
        return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});


module.exports = router;
