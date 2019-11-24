
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const cores = require("cors");
const configuer = require('./db/configuser')
const port = process.env.PORT || 8080;
const app = express();
var cookieParser = require('cookie-parser');
const  Product = require('./models/ProductSceema');
//router
const signup= require('./router/signup');
const login= require('./router/login');
const forgot= require('./router/forgot');
const resetpassword= require('./router/resetpassword');
const product= require('./router/product');
const logout= require('./router/logout');
const userProduct= require('./router/userProduct');
const productDetail= require('./router/productDetail');


const  passport = require('passport');
const bodyparser = require("body-parser"); 






app.use(cores());
app.use(cores({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.use("/api",signup)
app.use("/api",login)
app.use("/api",forgot)
app.use("/api",resetpassword)
app.use("/api",product)
app.use("/api",userProduct)
app.use("/api",logout)
app.use("/api",productDetail)

app.post("/searchdata", (req, res) => {
    let search = req.body.search
    let price = req.body.price;
  
    Product.find({ name: search }, (err, search) => {
      if (err) {
        return res.json({ success: false, err: err })
      }
  
      res.json({ success: true, data: search })
    })
  
  })

app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './public'));
});
app.listen(port,()=>{console.log("Server is Running ")});