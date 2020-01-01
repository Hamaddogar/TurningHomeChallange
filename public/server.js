
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const cores = require("cors");
const configuer = require('./db/configuser')
const port = process.env.PORT || 8080;
const app = express();
var cookieParser = require('cookie-parser');
const  Product = require('./models/ProductSceema');
// const stripe = Stripe('pk_test_A6nmCTS8PAeqCbO1a9r90gTp00ePBWwyk3');
// const elements = stripe.elements();
//router
const signup= require('./router/signup');
const login= require('./router/login');
const forgot= require('./router/forgot');
const resetpassword= require('./router/resetpassword');
const product= require('./router/product');
const logout= require('./router/logout');
const userProduct= require('./router/userProduct');
const sliderpicture= require('./router/sliderpicture');

const addSlider = require('./router/addslider')
const subscriber = require('./router/subscriber')
const favourite = require('./router/favourite')
const review = require('./router/review')
const userReview = require('./router/userReview')
const addcarttt = require('./router/addcartt')
const cartshow = require('./router/cart-item-get')
const  deleteCartitem = require('./router/deleteCartitem')
const  orderSubmit = require('./router/orderSubmit')





var mongoose = require('mongoose');
 var connecteduser = require('./db/configuser')
 var session = require('express-session')






const productDetail= require('./router/productDetail');




const bodyparser = require("body-parser"); 
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
  const dotenv=require('dotenv')
  var mongoose = require('mongoose')

  var db_url = process.env.DB_URL || 'mongodb://localhost:27017/Shopmate';
 
  
 
 const UserModel =require( './models/usermodel')



app.use(cores());
app.use(cores({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
 app.use(session({secret:"ali",resave:false,saveUninitialized:true}))


app.use("/api",signup)
app.use("/api",login)
app.use("/api",forgot)
app.use("/api",resetpassword)
app.use("/api",product)
app.use("/api",userProduct)
app.use("/api",logout)
app.use("/api",productDetail)
app.use("/api",addSlider)
app.use("/api",sliderpicture)
app.use("/api",subscriber)
app.use("/api",favourite)
app.use("/api",review)

app.use("/api",userReview)
app.use("/ac",addcarttt)
app.use("/api",cartshow)
app.use("/api",deleteCartitem)
app.use("/api",orderSubmit)












passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "2535545839898089",
      clientSecret: "404ac14c3afc210184f2bcf617ae2403",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      new UserModel(userData).save();
      done(null, profile);
    }
  )
);
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/Profile",
    failureRedirect: "/fail"
  })
);

app.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

app.get("/", (req, res) => {
  res.redirect("/Adminprofile!@");
});
// passport.use(new FacebookStrategy({
//   clientID: "2535545839898089",
//   clientSecret: "404ac14c3afc210184f2bcf617ae2403",
//   callbackURL: "http://localhost:3000/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   // User.findOrCreate( function(err, user) {
//   //   if (err) { return done(err); }
//   //   done(null, user);
//   // });
// }
// ));

// app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/Adminprofile!@',
//                                       failureRedirect: '/login' }));


app.post("/searchdata", (req, res) => {
    let search = req.body.search
     console.log(search)
    let price = req.body.price;
  
    Product.find({ name: search }, (err, searchproduct) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
   
      res.json({ success: true, data: searchproduct,whatsearch:req.body.search})
     
    })
  
  })

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './public'));
});

app.listen(port, async () => {
  await  mongoose.connect(db_url, { useNewUrlParser: true });
  console.log(`Server listening is running`)});
