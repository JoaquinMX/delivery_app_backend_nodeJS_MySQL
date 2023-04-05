const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.USER_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  database: "delivery_app",
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Database connected")
});

module.exports = db;