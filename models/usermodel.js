


var mongoose = require('mongoose')
var Schema = mongoose.Schema;



const Usermodel = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
})


module.exports = mongoose.model('AuthFacebook', Usermodel);

