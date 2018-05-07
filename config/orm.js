var connection = require("../config/connection.js");

var orm = {
    selectAll: function (table, callback) {
        connection.query("SELECT * FROM burgers", function (err, result) {
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
    updateOne: function (burgerId, callback) {
        connection.query("UPDATE burgers SET ? WHERE ?", [
            {
            devoured: true
        }, {
            id: burgerId
        }], function (err, result) {
            if (err) throw err;
            callback(result);
        });
    }
};

// export orm object for model burger.js
module.exports = orm;