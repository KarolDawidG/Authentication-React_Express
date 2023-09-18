const {pool} = require("../db");
const { validateEmail, validateUserName } = require('../../config/config');
const { v4: uuidv4 } = require('uuid');
const { USER_EXIST } = require("../../config/messages");



class UsersRecord{
    constructor(obj) {
        this.id = obj.id;
        this.username = obj.username;
        this.email = obj.email;
        this.role = obj.role;
      }

    static async performTransaction(callback) {
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

    static async activateAccount(id) {
      return UsersRecord.performTransaction(async (connection) => {
        const results = await connection.execute("UPDATE accounts SET is_active = true WHERE id = ?", [id]);
          return results;
      });
    }


    static async delete(id) {
      return UsersRecord.performTransaction(async (connection) => {
       const result = await connection.execute("DELETE FROM accounts WHERE id = ?", [id]);
          return result;
      });
    }

    static async insert(username, hashPassword, email){
      if (!validateEmail(email)) {
        throw new Error('Invalid email address.');
      }
  
      if (!validateUserName(username)) {
        throw new Error('Invalid username.');
      }
      const id = uuidv4();

        return UsersRecord.performTransaction(async (connection) => {
          await connection.execute("INSERT INTO accounts (id, username, password, email) VALUES (?, ?, ?, ?)", [id, username, hashPassword, email]);
            return id;
        })
    }

    static async updatePasswordByEmail([ hashPassword, email]) {
        return UsersRecord.performTransaction(async (connection) => {
          const results = await connection.execute("UPDATE accounts SET password = ? WHERE email = ?", [hashPassword, email]);
            return results;
        });
    }

    static async updatePasswordById([ hashPassword, id]) {
      return UsersRecord.performTransaction(async (connection) => {
        const results = await connection.execute("UPDATE accounts SET password = ? WHERE id = ?", [hashPassword, id]);
          return results;
      });
    }
    
    static async updateRole(role, username) {
      return UsersRecord.performTransaction(async(connection) => {
        const results = await connection.execute('UPDATE accounts SET role = ? WHERE username = ?', [role, username]);
          return results;
      })
    }
    ////////////////////////////////////////////////////////////////////////////////

    static async listAll(){
      const [results] = await pool.execute(`SELECT * FROM accounts`);
      return results.map(obj => new UsersRecord(obj));
  }

  static async selectByEmail(email) {
    const [results] = await pool.execute('SELECT * FROM accounts WHERE email = ?',email);
    return results; 
  }
  

  static async selectById(id){
    const [results] = await pool.execute('SELECT * FROM accounts WHERE id = ?',id);
    return results;
  }

  static async selectByUsername(username){
    const [results] = await pool.execute('SELECT is_active, role, password FROM accounts WHERE username = ?', username);
    return results;
  }

  }
        
module.exports = {
    UsersRecord,
}