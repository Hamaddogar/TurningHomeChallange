const express = require('express');
const router = express.Router();
const  Sliderpicture = require('../models/addslidersceema');
router.get("/sliderpicture", (req, res) => {
    let sliderpicture = new Sliderpicture();
    Sliderpicture.find({}, (err, userget) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: userget })
    })
  
  
  })
module.exports = router;