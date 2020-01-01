const express = require('express');
const router = express.Router();
const Cart = require('../models/addtocartsceema');

router.post("/deleteCartitem", (req, res) => {
   
           let itemid = req.body.itemid
             console.log(itemid)
  Cart. findByIdAndDelete(itemid, (err, user,next) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
      else{
            
          res.json({ success: true, data: user });
      }
      
      })


  
  })
module.exports = router;