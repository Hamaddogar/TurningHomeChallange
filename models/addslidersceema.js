var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const sliderSchema = new Schema({

    photoname: { type: Array},

   
 
 
})


const AddSlider= mongoose.model('AddSlider', sliderSchema);

module.exports = AddSlider;