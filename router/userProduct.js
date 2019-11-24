const express = require('express');
const router = express.Router();
const  Product = require('../models/ProductSceema');
router.get("/productShow", (req, res) => {
    let product = new Product();
    Product.find({}, (err, userget) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: userget })
    })
  
  
  })
module.exports = router;