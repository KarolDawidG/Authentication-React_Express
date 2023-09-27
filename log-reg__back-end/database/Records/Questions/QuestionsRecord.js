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

  static async insert(tableName, question, optionA, optionB, optionC, correctAnswer) {
    return performTransaction(async (connection) => {
      const query = "INSERT INTO ?? (question, optionA, optionB, optionC, correctAnswer) VALUES (?, ?, ?, ?, ?)";
      const values = [tableName, question, optionA, optionB, optionC, correctAnswer];
  
      const [result] = await connection.execute(query, values);
      return result.insertId;
    });
  }
  
  static async delete(id) {
      return performTransaction(async (connection) => {
        const result = await connection.execute(
          "DELETE FROM questions WHERE id = ?",
          [id],
        );
        return result;
      });
    }
  
    static async listAll() {
      const [results] = await pool.execute(`SELECT * FROM questions`);
      return results.map((obj) => new QuestionsRecord(obj));
    }

}

module.exports = {
  QuestionsRecord,
};



