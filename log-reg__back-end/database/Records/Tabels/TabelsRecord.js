const { performTransaction } = require("../performTransaction");
const {pool} = require("../../db");



class TabelsRecord {

  constructor(obj) {
    this.id = obj.id;
    this.question = obj.question;
    this.optionA = obj.optionA;
    this.optionB = obj.optionB;
    this.optionC = obj.optionC;
    this.correctAnswer = obj.correctAnswer;
  }

  static async tableExists(tableName) {
    return performTransaction(async (connection) => {
      const checkTableExistsQuery = `
        SELECT COUNT(*) AS tableExists
        FROM information_schema.tables
        WHERE table_schema = DATABASE() AND table_name = ?;
      `;

      const [checkResult] = await connection.execute(checkTableExistsQuery, [
        tableName,
      ]);

      return checkResult[0].tableExists === 1;
    });
  }

  static async createTable(tableName) {
    return performTransaction(async (connection) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          question TEXT NOT NULL,
          optionA TEXT NOT NULL,
          optionB TEXT NOT NULL,
          optionC TEXT NOT NULL,
          correctAnswer CHAR(1) NOT NULL)`;
      const [result] = await connection.execute(sql);
      return result;
    });
  }

  static async deleteTable(tableName) {
    return performTransaction(async (connection) => {
      const sql = `drop table ${tableName};`;
      const [result] = await connection.execute(sql);
      return result;
    });
  }

  static async showAllTablesOfUser(user) {
    return performTransaction(async (connection) => {
      const sql = `SHOW TABLES LIKE '%${user}%';`;
      const [result] = await connection.execute(sql);
        return result.map((row) => Object.values(row)[0]);
    });
  }

  static async listAll(table) {
    const sql = `select * from ${table}`;
    const [results] = await pool.execute(sql);
    return results.map((obj) => new TabelsRecord(obj));
  }

  static async insertQuestion(tableName, question, optionA, optionB, optionC, correctAnswer) {
    return performTransaction(async (connection) => {
      const query = "INSERT INTO " + tableName + " (question, optionA, optionB, optionC, correctAnswer) VALUES (?, ?, ?, ?, ?)";
      const values = [question, optionA, optionB, optionC, correctAnswer];
      const [result] = await connection.execute(query, values);
      return result.insertId;
    });
  }
  

}

module.exports = {
  TabelsRecord,
};
