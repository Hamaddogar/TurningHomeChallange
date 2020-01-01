
const express = require('express');
const router = express.Router();


const  Subscriber = require('../models/subscribersceema');


router.post("/subscriber",  (req, res, next) => {



    let subscriber = new Subscriber({   subscriber:req.body.subscriber });
  
    subscriber.save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: user })
    });
  
  })
  module.exports= router;