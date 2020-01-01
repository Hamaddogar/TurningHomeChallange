
const express = require('express');
const router = express.Router();


const  Addcart= require('../models/addtocartsceema');


router.post("/addcart",  (req, res) => {

 

    let addtocart = new  Addcart({   loginuser:req.body. loginuser ,color:req.body.colors,size:req.body.size,  productData:req.body. productData, counter:req.body.counter});
  
    addtocart.save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
          console.log(user)
      res.json({ success: true, data: user })
    });
  
  })
  module.exports= router;