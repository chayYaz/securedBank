const mysql2 = require('mysql2'); //It allows you to interact with a MySQL database.

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "0548574423",
  database: "fullstack7",
});

module.exports = connection;