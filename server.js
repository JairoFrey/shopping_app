// middleware, manages server
var express = require("express");
// allow you to parse info in a useable way from client to server/api
var bodyParser = require("body-parser");
var dotenv = require("dotenv").config();
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Import routes and give the server access to them.
var routes = require("./controllers/shopcontroller.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
