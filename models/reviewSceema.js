
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const ratingSceema = new Schema({

  ratingproduct:{type:Number},
 rating_product_id:{type:String},
 name:{type:String}


 
})

const ProductRating= mongoose.model('ProductRating',ratingSceema );

module.exports = ProductRating;