const mysql = require("mysql2");

const db = mysql.createConnection({
  host: 'localhost',
  user: "root",
  port: 3306,
  password: "password",
  database: "cities_db",
  multipleStatements: true
});

module.exports = db;
