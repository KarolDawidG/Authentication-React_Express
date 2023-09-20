const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware');
const {limiter, errorHandler} = require('../../config/config');
const MESSAGES = require('../../config/messages');
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
const {  verifyToken      } = require('../../config/config');
const { createPool } = require('mysql2/promise');
const {hostDB, nameDB, userDB, passDB} = require('../../config/configENV');

const pool = createPool({
  host: hostDB,
  user: userDB,
  password: passDB,
  database: nameDB,
  namedPlaceholders: true,
  decimalNumbers: true,
});

 
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