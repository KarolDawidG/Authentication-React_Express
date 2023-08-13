const {insertRoot, findRoot, createAccounts} = require('./querrys');

  const createAccountsTable = async (pool) => {
    try {
      await pool.query(createAccounts);

    } catch (err) {
      console.error(err);
    }
  };

  // const createRoot = async (pool) => {
  //     const [rows] = await pool.query(findRoot);
  //       if (rows.length === 0) {
  //         await pool.query(insertRoot);
  //       }
  // };
  

const createRoot = async (pool) => {
  try {
    const [rows] = await pool.query(findRoot);
    if (rows.length === 0) {
      await pool.query(insertRoot);
      await console.log('User root (pass: Admin12#) has been adedd.');
    } else{
      await console.log('User root status: 1')
    }
  } catch (err) {
    console.error(err);
  }
};




module.exports = {
  createAccountsTable,
  createRoot,
}