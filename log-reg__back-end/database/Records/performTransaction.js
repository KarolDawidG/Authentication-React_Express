const { pool } = require("../db");

async function performTransaction(callback) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const result = await callback(connection);

    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  performTransaction,
};
