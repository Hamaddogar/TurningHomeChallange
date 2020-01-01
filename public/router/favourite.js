
const express = require('express');
const router = express.Router();


const  Fav= require('../models/favouritesceema');



 
 
 
router.post("/favouriteproduct",  (req, res) => {
   
   
    let fav = new  Fav({   user:req.body. userId,favouriteProductsId:req.body.favouriteProducts });
     
    fav.save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: user })
    });
  

   


  })
  module.exports= router;