





var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const addtocartSceema = new Schema({

    loginuser:{type:String},
   size:{type:Array},
   colors:{type:Array},
   counter:{type:Number},
   productData:{type:Object},


 

 
})

const AddtoCart= mongoose.model('AddtoCart', addtocartSceema);

module.exports = AddtoCart;




