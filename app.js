const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


//pages
app.get("/", function(req, res){
  res.render("home");
});
app.get("/dashboard", function(req, res){
  res.render("dashboard")
});


app.listen(3006, function(){
  console.log("Server has started on port 3006..!");
});
