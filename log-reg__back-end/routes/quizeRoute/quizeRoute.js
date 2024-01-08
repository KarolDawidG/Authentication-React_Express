const express = require("express");
const router = express.Router();
const middleware = require("../../config/middleware");
const { errorHandler } = require("../../config/config");
const MESSAGES = require("../../config/messages");
const STATUS_CODES = require("../../config/status-codes");
const logger = require("../../logs/logger");
const { TabelsRecord } = require("../../database/Records/Tabels/TabelsRecord");

router.use(middleware);
router.use(errorHandler);

router.get("/:table", async (req, res) => {
  const { table } = req.params;

  try {
    const row = await TabelsRecord.listFromTable(table);
    return res.json({ quizeData: row });
  } catch (error) {
    logger.error(error.message);

    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});

module.exports = router;
