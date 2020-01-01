
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  subscriber: { type: String },
  
})

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber ;