const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genres');

//schemas 
const { customerSchema } = require('./customers');
const { movieSchema } = require('./movies');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer : {
        type : new mongoose.Schema({
            name : {
                type : String, 
                required : true,
                min : 3, 
                max : 25
            },
            isGold :{
                type : Boolean , 
            },
            phone : {
                type : String , 
                required : true,
                min : 10
            }
        }),
        required : true
    },
    movie : {
        type : new mongoose.Schema({
            title : {
                type : String, 
                min : 4, 
                max : 255,
                required : true
            },
            numberInStock : {
                type : Number, 
                min : 0,
                max : 255, 
                required : true
            },
            dailyRentalRate : {
                type : Number, 
                min : 0 , 
                max : 255, 
                required : true
            },
            genre : {
                type : genreSchema , 
                required : true
            }
        }),
        required : true
    },
    dateOut : {
        type : Date, 
        required : true,
        default : Date.now
    },
    dateReturned : {
        type : Date
    },
    rentalFee : {
        type : Number, 
        min: 0
    }
}));


function validateRental(rental){
    const schema = {
        customerId : Joi.string().required(),
        movieId : Joi.string().required()
    }
    return Joi.validate(rental, schema);
}

// export 
module.exports.Rental = Rental;
module.exports.validate = validateRental;