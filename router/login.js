const express = require('express');
const router = express.Router();
const Signup = require('../models/signupSceema');
const  passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


router.post("/loginUer", (req, res, next) => {

    passport.use(new LocalStrategy((username, password, next) => {

        Signup.findOne({ email: username }, (err, user) => {
      
          if (err) { return next(err) }
          if (!user) { return next(null, false) }
          user.verifyPassword(password, (err, isValid) => {
            if (err) { return next(err) }
            if (!isValid) { return next(null, false) }
            next(null, user)
      
          })
      
        })
      }));
      
      passport.serializeUser((user, next) => {
        next(null, user.id)
      
      });
      passport.deserializeUser((id, next) => {
        var user = user.find((user) => {
          return user.id === id;
        })
        next(null, user);
      })
      // passport End
      //Login 
      
      
      //LoginEnd
      
      
      
      
      
      
      
      
      
      
      
    passport.authenticate('local', function (err, user) {
  
      if (user) {
  
        req.login(user, function () {
          res.json(user)
        });
  
      } else {
        res.json(null);
      }
  
    })(req, next);
  
  })
  module.exports=router;