
const express = require('express');
const router = express.Router();


const  Review = require('../models/reviewSceema');


router.post("/review", (req, res, next) => {

    
    let review  = new Review ({ ratingproduct: req.body .myreview,rating_product_id:req.body.productreviewId,name:req.body.name});
  
    review .save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: user })
    });
  
  })
  module.exports= router;