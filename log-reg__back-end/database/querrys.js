const insertRoot = `INSERT INTO accounts (id, username, password, email, role) VALUES (UUID(), 'root', '$2b$10$8Lbg6tvI4e/mOyku3uvNNONfatfeTGHI/D531boVUqWIe3kTOKK/K', 'root@gmail.com', 'admin');`;

const findRoot = `SELECT id FROM accounts WHERE username = 'root'`;

const createAccounts = `
    CREATE TABLE IF NOT EXISTS accounts (
      id varchar(36) NOT NULL,
      username varchar(50) NOT NULL,
      password varchar(255) NOT NULL,
      email varchar(100) NOT NULL,
      role varchar(20) NOT NULL DEFAULT 'user',
      PRIMARY KEY (id),
      is_active BOOLEAN DEFAULT false,
      UNIQUE KEY (username),
      UNIQUE KEY (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
    `;

module.exports = {
    insertRoot,
    findRoot,
    createAccounts,
}