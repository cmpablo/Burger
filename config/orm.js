var connection = require("./connection.js");

var orm = {
    
    // select all burgers
    selectAll: function(whatToSelect, table) {
        var queryString = "SELECT ?? FROM ??";
        connection.query(queryString, [whatToSelect, tableInput],
        function(err, result) {
            if (err) throw err;
            console.log(result);
        });  
    },
    // insert one burger
    insertOne: function(table, column, burgerInput,  ) {
        var queryString = "INSERT ??"
    }



    //updateOne:
}

module.exports = orm;