const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware');
const { UsersRecord } = require('../../database/Records/UsersRecord');
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
const {  verifyToken } = require('../../config/config');

router.use(middleware);
 
router.get('/', verifyToken, async (req, res, next) => {
  const userRole = req.userRole; 
  logger.info(`${MESSAGES.AUTHORIZATION_LVL} ${userRole}`);

  if (userRole !== 'admin') {
      return res.status(STATUS_CODES.FORBIDDEN).send(MESSAGES.FORBIDDEN);
  }
  try {
        const usersList = await UsersRecord.listAll();
        return res.json({ usersList });
  } catch (error) {
        logger.error(error.message);
        return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});

// router.post('/delete/:id', async (req, res, next) => {
//    const id = req.params.id;

//    try {
//       await UsersRecord.delete(id);
//       res.status(200).send('The operation has been successful.');
//    } catch (error) {
//       console.error(error);
//       res.status(500).send('Unknown server error. Please contact your administrator.');
//    }
// });



module.exports = router;