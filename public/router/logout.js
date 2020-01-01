
const express = require('express');
const router = express.Router();

 router.get('/logout', function (req, res) {
    req.logout();
     req.session=null
    res.json({ success: true })
  
  });
  module.exports=router;