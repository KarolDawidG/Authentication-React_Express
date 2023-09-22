const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware');
const {errorHandler} = require('../../config/config');
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
const {pool} = require('../../config/../database/db');

router.use(middleware);
router.use(errorHandler);

 
router.get('/', async (req, res, next) => {
    try {
        const connection = await pool.getConnection(); 
        const [rows, fields] = await connection.execute('SELECT * FROM questions'); 
        connection.release();

        return res.json({ quizeData: rows }); 
    } catch (error) {
        logger.error(error.message);
        return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
});



module.exports = router;