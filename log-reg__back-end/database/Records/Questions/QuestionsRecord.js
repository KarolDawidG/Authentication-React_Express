const {pool} = require("../../db");
const { v4: uuidv4 } = require("uuid");
const { performTransaction } = require("../performTransaction");

class QuestionsRecord {
  constructor(obj) {
    this.id = obj.id;
    this.question = obj.question;
    this.optionA = obj.optionA;
    this.optionB = obj.optionB;
    this.optionC = obj.optionC;
    this.correctAnswer = obj.correctAnswer;
  }

  static async listAll(table) {
    const sql = `select * from ${table}`;
    const [results] = await pool.execute(sql);
    return results.map((obj) => new QuestionsRecord(obj));
  }

  static async insertQuestion(tableName, question, optionA, optionB, optionC, correctAnswer) {
    const id = uuidv4();
    return performTransaction(async (connection) => {
      const query = "INSERT INTO " + tableName + " (id, question, optionA, optionB, optionC, correctAnswer) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [id, question, optionA, optionB, optionC, correctAnswer];
      const [result] = await connection.execute(query, values);
      return result.insertId;
    });
  }
  
  static async delete(table, id) {
    return performTransaction(async (connection) => {
      const sql = "DELETE FROM " + table + " WHERE id = ?;";
      return await connection.execute(sql, [id]);
    });
  }

}

module.exports = {
  QuestionsRecord,
};
