var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// set the port
var PORT = process.env.PORT || 8080;

// push static content for the app from the "public" directory
app.use(express.static("public"));

// sets up the express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
    port: 8889,
    host: "localhost",
    user: "root",
    password: "root",
    database: "burgers_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

///// serve index.handlebars to the root route - display burgers already in db
app.get("/index", function (req, res) {
    connection.query("SELECT * FROM burgers;", function (err, data) {
        if (err) {
            return res.status(500).end();
        }

        res.render("index", {
            burgers: data
        });
    });
});

///// show the user the individual burger and the button to devour the burger
// app.get("/:id", function (req, res) {
//     connection.query("SELECT * FROM burger where id = ?", [req.params.id], function (err, data) {
//         if (err) {
//             return res.status(500).end();
//         }

//         console.log(data);
//         res.render("single-quote", data[0]); // render single-quote.handlbars
//     });
// });

///// add burger to database from submit
app.post("/api/burgers", function (req, res) {
    connection.query("INSERT INTO burgers_db (burger_name) VALUES ?", [req.body.burger_name], function (
        err,
        result
    ) {
        if (err) {
            // If an error occurred, send a generic server failure
            return res.status(500).end();
        }

        // Send back the ID of the new quote
        res.json({
            id: result.insertId
        });
    });
});

///// delete
// app.delete("/api/quotes/:id", function (req, res) {
//     connection.query("DELETE FROM quotes WHERE id = ?", [req.params.id], function (err, result) {
//         if (err) {
//             // If an error occurred, send a generic server failure
//             return res.status(500).end();
//         } else if (result.affectedRows === 0) {
//             // If no rows were changed, then the ID must not exist, so 404
//             return res.status(404).end();
//         }
//         res.status(200).end();

//     });
// });

///// Update a burger by an id and then redirect to the root route.
app.put("/api/burgers/:id", function (req, res) {
    connection.query(
        "UPDATE quotes SET burger_name = ?, devoured = ? WHERE id = ?", [req.body.burger_name, req.body.devoured, req.params.id],
        function (err, result) {
            if (err) {
                // If an error occurred, send a generic server failure
                return res.status(500).end();
            } else if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();

        }
    );
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});