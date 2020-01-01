
const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');


const  Ordersubmit = require('../models/orderSubmit');

router.post("/orderSubmit", (req, res, next) => {

  
  
  
 
  
    var smtpTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "shopmatechallenge@gmail.com",
        pass: "12345hamad"
      }
    });

    var mailOptions = {
      to: req.body.Email,
      from: 'shopmatechallenge@gmail.com',
      subject: 'Shop Mate  (Turning)',
      text: req.body.uname+'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://localhost:3000/reset/' + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
      res.json('Your e-mail Successfully  has been  sent to ');
      done(err, 'done');
  
    }) 
    let ordersubmit = new Ordersubmit({  cartProduct: req.body. cartProduct,  uname: req.body.uname,Email: req.body.Email,phonenumber: req.body.phonenumber,  paymentMethod: req.body. paymentMethod ,loginUser:req.body.loginUser,totalprice:req.body.totalprice});

    ordersubmit.save((err, user) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: user })
    });
  
  })
  module.exports= router;