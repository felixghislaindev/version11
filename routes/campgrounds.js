
var express = require("express");
var router = express.Router();
var campsites = require("../models/campground");
var middleware = require("../midlleware");


//show all campingsites
router.get("/",  function(req, res){
    campsites.find({},function(err,allcampsites){
      if(err){
        console.log(err);
      } else{
        res.render("campgrounds",{ campsites:allcampsites});
      }
    })
    
    
    });
    // create our new campsites
    router.post("/", middleware.isLoggedIn, function(req, res){
      var name = req.body.newcamp;
      var image = req.body.newcampimage;
      var description = req.body.campdes;
      var author = {
        id: req.user._id,
        username:req.user.username
      }
      var newcampsite = {name:name, image:image, description:description, author:author}
      console.log(req.user);
    campsites.create(newcampsite, function(err,newcamp){
      if(err){
        console.log("Data has not been added");
      }else {
        console.log("Sucess!");
        console.log(newcamp);
          res.redirect("/campgrounds");
      }
    });
    
    });
    // display the form to create new campground
    router.get("/new",middleware.isLoggedIn,  function(req, res){
      //getting data from the form
    
      res.render("new");
    
    });
    
    // show - show more infromation about one campground 
    router.get("/:id", function(req,res){
      campsites.findById(req.params.id).populate("comments").exec(function(err,foundcampsite){
        if(err){
          console.log("could not find anything!!");
        } else {
          res.render("show",{campground: foundcampsite});
        }
      });
    
    });
 
         // edit campground
         router.get("/:id/edit", function(req,res){
           campsites.findById(req.params.id, function(err, foundcampground){
             if (err){
               re.redirect("/campgrounds");
             } else{
               res.render("edit", {campground:foundcampground});
             }
           })
         })
        


          //Update campground route

          router.put("/:id", function(req,res){
            // find and upfate

            campsites.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
              if(err){
                res.redirect("/campgrounds");

              } else{
                res.redirect("/campgrounds") + req.params.id;
              }
            })
          })                                             
    module.exports = router;