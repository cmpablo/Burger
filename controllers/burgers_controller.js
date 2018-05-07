var express = require("express");
var router = express.Router();
///// import the model to use its database functions
var burger = require("../models/burger.js");

///// create routes
// redirect to index
router.get("/", function(req, res) {
    res.redirect("/index");  
});

// index
router.get("/index", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = { burgers: data};
        res.render("index", hbsObject);
    });
});

//add a burger
router.post("/burgers", function(req, res) {
    burger.insertOne(req.body.burger_name, function() {
        res.redirect("/index");
    });
});

//devour a burger
router.post("/burgers/:id", function(req, res) {
    var condition = "id= " + req.params.id;

    console.log("devoured", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows === 0) {
            return res. status(404).end();
        } else {
            res.redirect("/index");
            res.status(200).end();
        }
    });
});

// export routes for server.js to use
module.exports = router;