
const express = require('express');
const router = express.Router();

 router.get('/logout', function (req, res) {
    req.logout();
    res.json({ success: true })
  
  });
  module.exports=router;