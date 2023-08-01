const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware')
const { verifyToken } = require('../../config/config');
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
router.use(middleware);

router.get('/', verifyToken, (req, res, next) => {
    const userRole = req.userRole;
    logger.info(`${MESSAGES.AUTHORIZATION_LVL} ${userRole}`);
    
    if (userRole !== 'admin') {
        return res.status(STATUS_CODES.FORBIDDEN).send(MESSAGES.FORBIDDEN);
    }
    try {
        return res.status(STATUS_CODES.SUCCESS).json({ userRole: userRole, message: `${MESSAGES.SUCCESSFUL_OPERATION}` })
    } catch (error) {
        console.error(error);
        logger.error(error.message);
        return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
  });

module.exports = router;


