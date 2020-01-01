const express = require('express');
const router = express.Router();
const Cart = require('../models/addtocartsceema');

router.get("/cartitem", (req, res) => {
   
      
  Cart.find({}, (err, user,next) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
      else{
            
          res.json({ success: true, data: user });
      }
      
      })


  
  })
module.exports = router;