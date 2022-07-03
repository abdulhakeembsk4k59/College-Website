const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb://localhost:27017/CollegeDB", {useNewUrlParser: true});
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User  = new mongoose.model("User", userSchema);


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



// loding dashboard page after registering
app.post("/std-register", function(req, res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    const newUser = new User({
      email: req.body.username,
      password: hash
    });

    newUser.save(function(err){
      if(err){
        console.log(err);
      }else{
        res.render("dashboard");
      }
    });
  });
});

// Loading dashboard page after loging in
app.post("/std-login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({email: username}, function(err, foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        bcrypt.compare(password, foundUser.password, function(err, result){
          if(result === true){
            res.render("dashboard");
          }
        });
      }
    }
  });
});


app.listen(3006, function(){
  console.log("Server has started on port 3006..!");
});
