const express = require("express");
const router = express.Router();
const middleware = require("../../config/middleware");
const { errorHandler } = require("../../config/config");
const MESSAGES = require("../../config/messages");
const STATUS_CODES = require("../../config/status-codes");
const logger = require("../../logs/logger");
const { pool } = require("../../config/../database/db");
const { generateRandomNumbers } = require("../../utils/functions");

router.use(middleware);
router.use(errorHandler);

router.get("/", async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute("SELECT * FROM questions");
    connection.release();
    const arrayRandomRows = [];
    const randomNumbersArray = generateRandomNumbers(rows.length);

    for (const index of randomNumbersArray) {
      arrayRandomRows.push(rows[index]);
    }

    console.log(randomNumbersArray);

    return res.json({ quizeData: arrayRandomRows });
  } catch (error) {
    logger.error(error.message);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});

module.exports = router;
