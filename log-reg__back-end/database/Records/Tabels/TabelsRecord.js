const { performTransaction } = require("../performTransaction");

class TabelsRecord {
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

      const tableNames = result.map((row) => Object.values(row)[0]);

      return tableNames;
    });
  }
}

module.exports = {
  TabelsRecord,
};
