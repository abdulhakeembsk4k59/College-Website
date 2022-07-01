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

app.get("/std-register", function(req, res){
  res.render("std-register");
});
app.get("/std-login", function(req, res){
  res.render("std-login");
});
app.get("/std-materials", function(req, res){
  res.render("std-materials");
});
app.get("/std-notifications", function(req, res){
  res.render("std-notifications");
});


// Faculty
app.get("/fac-register",function(req, res){
  res.render("fac-register");
});
app.get("/fac-login", function(req, res){
  res.render("fac-login");
});
app.get("/fac-timings", function(req, res){
  res.render("fac-timings");
});
app.get("/fac-notifications", function(req, res){
  res.render("fac-notifications");
});


app.listen(3006, function(){
  console.log("Server has started on port 3006..!");
});
