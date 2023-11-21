const Joi = require('joi');
const mongoose = require('mongoose');



// creating databse model passing schema 

const customerSchema = new mongoose.Schema({
    name : {
        type: String, 
        minlength : 5, 
        maxlength : 50 , 
        required : true
    },
    isGold : Boolean,
    phone : {
        type: String,
        min: 10,
        max : 11,
        required: true
    }
});
const Customer = mongoose.model('Customer', customerSchema );


function validateCustomer(customer){
    const schema = {
        name : Joi.string().min(3).required(),
        isGold : Joi.boolean(),
        phone: Joi.string().min(10).required()
    };
    return Joi.validate(customer, schema);

}


module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
