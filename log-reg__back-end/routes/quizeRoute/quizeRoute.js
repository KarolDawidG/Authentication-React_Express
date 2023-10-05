const express = require("express");
const router = express.Router();
const middleware = require("../../config/middleware");
const { errorHandler } = require("../../config/config");
const MESSAGES = require("../../config/messages");
const STATUS_CODES = require("../../config/status-codes");
const logger = require("../../logs/logger");

router.use(middleware);
router.use(errorHandler);

router.get("/:user", async (req, res) => {
  const user = req.params;
  console.log(user);
  try {

    
    return res.status(200);
  } catch (error) {
    logger.error(error.message);

    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});

module.exports = router;
