const Joi = require('joi');
const pwComplexity = require('joi-password-complexity');
const { unique } = require('joi/lib/types/array');
const string = require('joi/lib/types/string');
const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true, 
        min : 3, 
        max : 25,
        unique : true
    },
    email : {
        type : String, 
        min : 5, 
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true, 
        min : 8
    }
});


function validateUser(user){
    const schema = {
        username : Joi.string().min(3).max(25).required(),
        email : Joi.string().min(5).required().email(),
        password : Joi.string().min(8).max(12).required()
    };
    return Joi.validate(user, schema);
}


const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validate = validateUser;