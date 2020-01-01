
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const favouriteSceema = new Schema({

  user:{type:String},
  favouriteProductsId:{type:Array}

 
})

const Favouriteproduct= mongoose.model('Favouriteproduct', favouriteSceema);

module.exports = Favouriteproduct;