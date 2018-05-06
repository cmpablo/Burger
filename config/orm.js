var connection = require("../config/connection.js");

var orm = {
    selectAll: function (table, callback) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
    },
    insertOne: function (burger_name, callback) {
        connection.query("INSERT INTO burgers SET ?", {
            burger_name: burger_name,
            devoured: false
        }, function (err, result) {
            if (err) throw err;
            callback(result);
        });
    },
    updateOe: function (id, callback) {
        connection.query("UPDATE burgers SET ? WHERE ?", [{
            devoured: true
        }, {
            id: id
        }], function (err, result) {
            if (err) throw err;
            callback(result);
        });
    }
};

// export orm object for model burger.js
module.exports = orm;