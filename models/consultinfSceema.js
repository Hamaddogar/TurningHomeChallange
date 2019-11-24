
var mongoose = require( 'mongoose' )
var Schema = mongoose.Schema;


const consultSchema =  new Schema({
 email:{type:String,required: [true, 'Email must be provieded']},
 companyname:{type:String,required: [true, 'password must be given ']},
 address:{type:String,required: [true, 'name must be given ']},
 phone:{type:String,required: [true, 'father name given should be']},
 provinciesName:{type:String,required: [true, 'name must be given ']},

 zipcode:{type:String,required: [true, 'type must be selected']},



 
 

})
const Consult = mongoose.model( ' ConsultingServices', consultSchema );

module.exports = Consult;
