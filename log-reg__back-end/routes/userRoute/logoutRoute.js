const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware');
const logger = require('../../logs/logger');
router.use(middleware);

router.get('/', (req, res, next) => {
    try {
        console.log("The user has been logged out.")
        res.clearCookie('user');
        res.clearCookie('token');
        return res.status(200).send('The server is working properly.');
    } catch (error) {
        logger.error(error.message);
    }
});

module.exports = router;
