var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 8889,
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "burgers_db"
});

//var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

module.exports = connection;