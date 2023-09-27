const express = require("express");
const router = express.Router();
const middleware = require("../../config/middleware");
const { TabelsRecord } = require("../../database/Records/Tabels/TabelsRecord");
const MESSAGES = require("../../config/messages");
const STATUS_CODES = require("../../config/status-codes");
const logger = require("../../logs/logger");

router.use(middleware);

//POSTMAN: http://localhost:3001/create-table/testowaBazaDanych
// status POST:     200
// status DELETE:   200

router.post("/:testName", async (req, res) => {
  const { testName } = req.params;
  console.log(testName);
    try {
        const tableExists = await TabelsRecord.tableExists(testName);
        if (tableExists) {
          return res.status(STATUS_CODES.SUCCESS).send(`Tabela ${testName} już istnieje.`);
        }

      await TabelsRecord.createTable(testName);
  
      return res.status(STATUS_CODES.SUCCESS).send("Tabela została pomyślnie utworzona.");
    } catch (error) {
      logger.error(`Błąd podczas tworzenia tabeli: ${error.message}`);
      return res.status(STATUS_CODES.SERVER_ERROR).send('Blad tworzenia tabeli');
    }
  });

  router.delete("/:testName", async (req, res) => {
    const { testName } = req.params;
  
    try {
        const tableExists = await TabelsRecord.tableExists(testName);
        if (!tableExists) {
          return res.status(STATUS_CODES.SUCCESS).send(`Tabela: '${testName}' nie istnieje.`);
        }

      await TabelsRecord.deleteTable(testName);
  
      return res.status(STATUS_CODES.SUCCESS).send("Tabela została pomyślnie skasowana.");
    } catch (error) {
      logger.error(`Błąd podczas tworzenia tabeli: ${error.message}`);
      return res.status(STATUS_CODES.SERVER_ERROR).send('Blad kasowania tabeli');
    }
  });


  module.exports = router;
  