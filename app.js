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
app.get("/acadamic-2022", function(req, res){
  res.render("acadamic-2022");
});
app.get("/acadamic-2021", function(req, res){
  res.render("acadamic-2021");
});
app.get("/acadamic-2020", function(req, res){
  res.render("acadamic-2020");
});
app.get("/acadamic-2019", function(req,res){
  res.render("acadamic-2019");
});
app.get("/about", function(req, res){
  res.render("about")
});

app.get("/contact", function(req, res){
  res.render("contact")
});


app.listen(3006, function(){
  console.log("Server has started on port 3006..!");
});
