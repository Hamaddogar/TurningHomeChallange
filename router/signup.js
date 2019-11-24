const express = require('express');
const Signup = require('../models/signupSceema');

     const router = express.Router();
     router.post("/signup", (req, res) => { 
      let myuser = new Signup({ uname: req.body.uname, email: req.body.email, password: req.body.password });
      Signup.find({email:req.body.email},(err,user)=>{
                    if(user.length !==0){
                        
                  return res.json({ success: false ,err:err})
                    }
                    else{
                      myuser.save(( user) => {
                         
                            res.json({ success: true, data: user })
                          });   
                    }
             })
            
      })
    module.exports= router;