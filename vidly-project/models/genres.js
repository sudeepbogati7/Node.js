const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name : {
        type: String,
        minlength : 5, 
        maxlength : 50,
        required: true
    }
});

const Genre = mongoose.model('Genre',  genreSchema);



function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}


module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;
