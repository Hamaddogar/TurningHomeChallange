const express = require('express');
const router = express.Router();


const  Product = require('../models/ProductSceema');
router.get("/productdetail/:productId", (req, res) => {
    let showuser = new Product();
    Product.findById({ _id: req.params.productId }, (err, userget) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: userget })
  
    })
  
  })
   module.exports=router;