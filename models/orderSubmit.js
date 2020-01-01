


var mongoose = require('mongoose')
var Schema = mongoose.Schema;



const orderSchema = new Schema({
    cartProduct:{type:Array},
  uname: { type: String },
  Email: { type: String },
  phonenumber: { type: Number },
  paymentMethod: { type: String },
  loginUser: { type: String },
  totalprice: { type: String }
})


const Ordersubmit= mongoose.model('Ordersubmit', orderSchema);

module.exports = Ordersubmit;