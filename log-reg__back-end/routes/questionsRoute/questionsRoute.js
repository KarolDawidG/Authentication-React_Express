const express = require("express");
const router = express.Router();
const middleware = require("../../config/middleware");
const { QuizzesRecord } = require("../../database/Records/Tabels/TabelsRecord");
const MESSAGES = require("../../config/messages");
const STATUS_CODES = require("../../config/status-codes");
const logger = require("../../logs/logger");

router.use(middleware);


router.get("/:tables", async (req, res, next) => {
  const tables = req.params.tables;

  try {
    const quizzesList = await QuizzesRecord.listAll(tables);
    return res.json({ quizzesList });
  } catch (error) {
    logger.error(error.message);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});

router.post("/:tables", async (req, res) => {
  const tables = req.params.tables;
  const { question, optionA, optionB, optionC, correctAnswer } = req.body;

  try {

    await QuizzesRecord.insert(tables, question, optionA, optionB, optionC, correctAnswer);
    
    return res.status(200).send("The post operation has been successful.");
  } catch (error) {
    logger.error(error.message);
    return res.status(STATUS_CODES.SERVER_ERROR).send(MESSAGES.SERVER_ERROR);
  }
});



router.update("/:tables", async (req, res) => {
  const tables = req.params.tables;
  const { question, optionA, optionB, optionC, correctAnswer } = req.body;

  try {
    await QuizzesRecord.updateRole(question, optionA, optionB, optionC, correctAnswer, tables);
    return res.status(200).send("The operation has been successful.");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Unknown server error. Please contact your administrator.");
  }
});

router.delete("/:tables/:id", async (req, res, next) => {
  const id = req.params.id;
  const tables = req.params.tables;

  try {
    await QuizzesRecord.delete(id, tables);
    return res.status(200).send("The operation has been successful.");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send("Unknown server error. Please contact your administrator.");
  }
});

module.exports = router;
