const express = require('express');
const router = express.Router();
const Cart_item =require('../models/addtocartsceema');


router.get("/cartshow", (req, res) => {
   
      
    Cart_item.find({}, (err, user,next) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
 
          res.json({ success: true, data: user })
      
      })
   
    
    
    
  

  
  })
module.exports = router;