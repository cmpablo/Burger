var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

var app = express();

///// serve static content for the app from the "public" directory 
app.use(express.static("public"));

///// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

///// parse application/json
app.use(bodyParser.json());

///// set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

///// import routes and give the server access to them
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
