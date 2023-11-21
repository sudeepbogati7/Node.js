const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genres');

const movieSchema = new mongoose.Schema({
    title : {
        type : String, 
        required: true, 
        min:3, 
        max : 255,
        trim : true
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
});

const Movie = mongoose.model('Movie', movieSchema);


function validateMovie(movie){
    const schema = {
        title : Joi.string().min(3).max(255).required(),
        genreId : Joi.string().required(),
        numberInStock : Joi.number().min(0).max(255).required(),
        dailyRentalRate : Joi.number().min(0).max(255).required()
    };
    return Joi.validate(movie,schema );
}

module.exports.movieSchema = movieSchema;
module.exports.validate = validateMovie;
module.exports.Movie = Movie;
