const express = require('express');
const router = express.Router();
const  Product = require('../models/ProductSceema');
const   Favouriteproduct= require('../models/favouritesceema');

router.get("/productShow", (req, res) => {
    let product = new Product();
    let favouriteproduct= new Favouriteproduct();
      
    Product.find({}, (err, user,next) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
     else{
      Favouriteproduct.find({}, (err, userget,next) => {
      
        if (err) {
          return res.json({ success: false, err: err })
        }
            
          res.json({ success: true, data: user,datafav:userget })
      
      })
    }
    
    
    })
  

  
  })
module.exports = router;