
const express = require('express');
const router = express.Router();
var upload = require('../db/multerImage');

const  AddSlider= require('../models/addslidersceema');

router.use(express.static('../uploads'));
router.post("/addslider",upload.array('picture',5),(req, res, next) => {



    let addSlider= new AddSlider({ photoname: req.files.map((picname) => { return picname.filename })});
  
    addSlider.save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: user })
    });
  
  })
  module.exports= router;