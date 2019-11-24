
const express = require('express');
const router = express.Router();
var upload = require('../db/multerImage');

const  Product = require('../models/ProductSceema');

router.use(express.static('../uploads'));
router.post("/addProduct", upload.array('photos'), (req, res, next) => {



    let product = new Product({ name: req.body.name,  price: req.body.price,discounted_price: req.body.discounted_price, photoname: req.files.map((picname) => { return picname.filename }), description: req.body.description, userId: req.body.userId });
  
    product.save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: user })
    });
  
  })
  module.exports= router;