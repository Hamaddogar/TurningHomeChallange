const express = require('express');
const router = express.Router();
const Reviewuser = require('../models/reviewSceema');


router.get("/userreview", (req, res) => {


    Reviewuser.find({}, (err, user) => {
        if (err) {
            return res.json({ success: false, err: err })
        }


        res.json({ success: true, data: user })

    })

    


  
  })
module.exports = router;