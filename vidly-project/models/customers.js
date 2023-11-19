const Joi = require('joi');
const mongoose = require('mongoose');



// creating databse model passing schema 
const Customer = mongoose.model('Customer', new mongoose.Schema({
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
}));


function validateCustomer(customer){
    const schema = {
        name : Joi.string().min(3).required(),
        isGold : Joi.boolean(),
        phone: Joi.string().min(10).required()
    };
    return Joi.validate(customer, schema);

}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
