const {pool} = require("../db");
const { validateEmail } = require('../../config/config');
const { v4: uuidv4 } = require('uuid');


class UsersRecord{
    constructor(obj) {
        this.id = obj.id;
        this.username = obj.username;
        this.email = obj.email;
        this.role = obj.role;
      }
    
    static async activateAccount(id) {
        const results = await pool.execute("UPDATE accounts SET is_active = true WHERE id = ?", [id]);
        return results;
      }

    static async listAll(){
        const [results] = await pool.execute(`SELECT * FROM accounts`);
        return results.map(obj => new UsersRecord(obj));
    }

    static async selectByEmail(email){
      const [results] = await pool.execute('SELECT * FROM accounts WHERE email = ?',email);
      return results;
    }

    static async selectById(id){
      const [results] = await pool.execute('SELECT * FROM accounts WHERE id = ?',id);
      return results;
    }

    static async selectByUsername(username){
      const [results] = await pool.execute('SELECT * FROM accounts WHERE username = ?', username);
      return results;
    }

    static async delete(id) {
         await pool.execute("DELETE FROM accounts WHERE id = ?", [id]);
    }

    static async insert([username, hashPassword, email]) {
      if (!validateEmail(email)) {
        throw new Error('Invalid email address');
      }

      const id = uuidv4(); 
      const result = await pool.execute("INSERT INTO accounts (id, username, password, email) VALUES (?, ?, ?, ?)", [id, username, hashPassword, email]);
      return id;
    }
  
    static async updatePasswordByEmail([ hashPassword, email]) {
      const results = await pool.execute("UPDATE accounts SET password = ? WHERE email = ?", [hashPassword, email]);
      return results;
    }

    static async updatePasswordById([ hashPassword, id]) {
      const results = await pool.execute("UPDATE accounts SET password = ? WHERE id = ?", [hashPassword, id]);
      return results;
    }
  
  }
        
module.exports = {
    UsersRecord,
}