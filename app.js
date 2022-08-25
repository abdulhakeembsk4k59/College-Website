const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const isset = require("isset");
const empty = require("is-empty");
const Error = require("messages");


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb+srv://admin-hakeem:root@cluster0.1zo3y.mongodb.net/CollegeDB?retryWrites=true&w=majority", { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
  fullName: String,
  id: String,
  email: String,
  password: String
});
const User  = new mongoose.model("User", userSchema);

const idSchema = new mongoose.Schema({
  idEntry: String
});
const Id = new mongoose.model("Id", idSchema);


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

app.get("/idEntry", function(req, res){
  res.render("idEntry");
});



// loding dashboard page after registering
app.post("/std-register", function(req, res){
  const id = req.body.id;
  Id.findOne({idEntry:id}, function(id_err, id_result){
    if(isset(id_err)&& !empty(id_err)){
      reject(Error.database_error());
    }else{
      if(isset(id_result)&& !empty(id_result)){
        console.log("Id Alrady Exists...");
        res.render("std-register");
      }else{
        console.log("All good at time");
      }
    }
  });

  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    const newUser = new User({
      fullName: req.body.fullName,
      id: req.body.id,
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

app.post("/idEntry", function(req, res){
  const newId = new Id({
    idEntry: req.body.id
  });
  newId.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("idEntry");
    }
  });
});


app.listen(3006, function(){
  console.log("Server has started on port 3006..!");
});
