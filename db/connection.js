const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'testRoot',
      // TODO: Add MySQL password here
      password: 'root',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

connection.connect();

module.exports = connection;