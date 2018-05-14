var express = require("express"),
http = require('http'),
request = require("request")
,bodyParser = require("body-parser"),
mongoose = require("mongoose"), 
campsites = require("./models/campground"),
seedDB = require("./seed"),
passport = require("passport"),
methodOveride = require("method-override"),
LocalStrategy = require("passport-local"),
flash = require("connect-flash"),

User = require("./models/user");
var Comment = require("./models/comment");

// requiring routes
// requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/auth");

// seedDB(); seed the database
//connect to the database
mongoose.connect("mongodb://localhost/yelp-camp");






var app = express();
//will tell express to loock for the file in th public directory
app.use(express.static(__dirname + "/public"));
//using bodyparser
app.use(bodyParser.urlencoded({extended:true}));
// will let express know that we are using ejs files
app.set("view engine", "ejs");
app.use(methodOveride("-method"));
app.use(flash());

// pasport configuration
app.use(require("express-session")({
  secret:"hacker",
  resave: false,
  saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
 
// looged user data
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})


app.use( "/", authRoutes);
app.use( "/campgrounds", campgroundRoutes);
app.use( commentRoutes);







app.listen( 3000, function () {
  console.log("server is on!!");

});
