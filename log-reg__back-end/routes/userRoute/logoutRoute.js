const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware');
const logger = require('../../logs/logger');
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
router.use(middleware);

router.get('/', (req, res, next) => {
    try {
        logger.info("The user has been logged out.");
        return res.status(STATUS_CODES.SUCCESS).send(MESSAGES.USER_NOT_LOGGED_IN);
    } catch (error) {
        logger.error(error.message);
    }
});

module.exports = router;
