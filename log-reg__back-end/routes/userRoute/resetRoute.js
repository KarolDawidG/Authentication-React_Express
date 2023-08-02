const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require("../../config/middleware");
const router = express.Router();
const { UsersRecord } = require("../../database/Records/UsersRecord");
const logger = require('../../logs/logger');
const {jwt_secret} = require('../../config/configENV')
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
router.use(middleware);

router.get('/:id/:token',  (req, res) => {
try {
  res.status(STATUS_CODES.SUCCESS).send(MESSAGES.SUCCESSFUL_OPERATION);
} catch (error) {
  logger.error(error);
}
});

router.post('/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  let oldPasword = '';

  try {
    const [user] = await UsersRecord.selectById([id]);
    oldPasword = user?.password;

    const secret = jwt_secret + oldPasword;
    const payload = jwt.verify(token, secret);
  
    const hashPassword = await bcrypt.hash(password, 10);

    await UsersRecord.updatePasswordById([hashPassword, id]);

    logger.info(MESSAGES.SUCCESSFUL_RESET);
    return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.PASS_RESET);
  } catch (error) {
    logger.error(`Server error: ${error.message}`);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.JWT_ERROR);
  }
});



module.exports = router;
