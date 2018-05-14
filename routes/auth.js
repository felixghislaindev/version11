// require express router
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//define a route
router.get("/",  function(req, res){
    res.render("home");
  });
  
  
  
  // AUTH ROUTES
  // REGISTER FORM
  router.get("/register", function(req,res){
    res.render("register");
  });
  router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
      if(err){
        req.flash("error", err.message);
        console.log(err.message);
        return res.render("register");
        
      }
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to Yelpcamp" + user.username);
        res.redirect("/campgrounds");
      });
    });
  });
  
  // show login form
  router.get("/login", function(req,res){
    res.render("login");
  })
  router.post("/login",passport.authenticate("local", { successRedirect:"/campgrounds",
                                                    failureRedirect: "/login"}), function(err,user){
                                                      
  });
  
  
  // 
  router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "You Have Been Logged Out");
    res.redirect("/");
  })
  
  
 

  module.exports = router;
