
var express = require("express");

var router = express.Router({mergeParams:true});
var campsites = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../midlleware");



// comment route

router.get("/campgrounds/:id/comment/new",middleware.isLoggedIn ,function(req,res){
    // FINd CAMP BY ID 
  campsites.findById(req.params.id, function(err, campsites){
    if (err){
      console.log(err);
    } else {
      res.render("comment", {campsites:campsites});
    }
  });
    
  });
  
  
  router.post("/campgrounds/:id/comment",middleware.isLoggedIn,function(req,res){
    // look up camp using id

  campsites.findById(req.params.id, function(err,campground){
    if (err){
      console.log(err);
      res.redirect("/campgrounds");
    } else{
      Comment.create(req.body.comment, function(err, comment){
        if (err){
          console.log(err);
        } else{
          console.log(req.body.comment);
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //      //save comment
               comment.save();
               campground.comments.push(comment._id);
               campground.save();
               console.log(comment);
         
          // console.log(comment.author.username);
       res.redirect("/campgrounds/" + campground._id);
        }
      });
      
    }
  });
  });
  // edit comment 
  router.get("/campgrounds/:id/comment/:comment_id/edit", middleware.checkownership ,function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
      if(err){
        console.log(err);
      } else {
        
        res.render("commentedit", {campground_id : req.params.id, comments:foundComment});
      }
    });

  });
    //Updating comments 
    router.put("/campgrounds/:id/comment/:comment_id", function(req,res){
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updattedcomment){
       if (err){
         console.log(err);
       } else{
         console.log(req.params.comment_id);
         res.redirect("/campgrounds/" + req.params.id);
       }
     })
    }); 


    // delete comment 
    router.delete("/campgrounds/:id/comment/:comment_id",middleware.checkownership ,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
        res,redirect("back");
      } else {
        res.redirect("/campgrounds/" + req.params.id);
      }
    });
    });

    // Authorization for comments 

  
  

  module.exports = router;