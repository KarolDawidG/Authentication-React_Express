const express = require('express');
const router = express.Router();
const middleware = require('../../config/middleware');
const { errorHandler } = require('../../config/config');
const MESSAGES = require('../../config/messages'); 
const STATUS_CODES = require('../../config/status-codes');
const logger = require('../../logs/logger');
const { pool } = require('../../config/../database/db');
const { getRandomIndex } = require('../../utils/functions');

router.use(middleware);
router.use(errorHandler);

router.get('/', async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM questions');
        connection.release();

        const numberOfQuestions = 20;
        const randomlySelectedRows = [];
        const arrayRandomRows = [];
        let randomIndex;

        for (let i = 0; i < numberOfQuestions; i++) {
            randomIndex = getRandomIndex(rows.length);
            randomlySelectedRows.push(randomIndex);
        }

        for (const index of randomlySelectedRows) {
            arrayRandomRows.push(rows[index]);
        }
        
        return res.json({ quizeData: arrayRandomRows });
    } catch (error) {
        logger.error(error.message);
        return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
    }
});

module.exports = router;
