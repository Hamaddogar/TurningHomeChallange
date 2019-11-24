


var mongoose = require('mongoose')
var Schema = mongoose.Schema;



const productSchema = new Schema({
  name: { type: String },
  price: { type: String },
  photoname: { type: Array },
  discounted_price: { type: String },
  description: { type: String },
  userId: { type: String }
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;