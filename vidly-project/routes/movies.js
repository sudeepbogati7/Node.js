const express = require('express');
const { async } = require('jshint/src/prod-params');
const mongoose = require('mongoose');
const { validate , Movie} = require('../models/movies');
const { Genre } = require('../models/genres');

const router = express.Router();


router.get('/', async(req, res) =>{
    const movies = await Movie.find().sort('title');
    res.send(movies);
});


router.post('/', async(req, res) =>{
    const {error} = validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send("Invalid genre !");

    let movie =  new Movie({
        title : req.body.title,
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate,
        genre :{
            _id : genre.genreId,
            name : genre.name
        } 
    });
    movie = await movie.save();
    res.send(movie);
});



router.put('/:id', async(req, res) =>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send("Invalid genre");

    const movie = await Movie.findByIdAndUpdate(req.params.id , {
        title : req.body.title, 
        numberInStock : req.body.numberInStock, 
        dailyRentalRate : req.body.dailyRentalRate, 
        genre : {
            _id : genre._id,
            name : genre.name
        }
    }, {new : true});

    if(!movie) return res.status(404).send("The movie with the given ID was not found ! ");

    res.send(movie);
});


router.delete('/:id', async(req, res)=>{
    const movie= await Movie.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(404).send("Movie with the given ID was not found ! ");
    res.send({message: "Successfully deleted !", movie: movie}  );
});

router.get('/:id', async (req, res) =>{
    const movie = await Movie.findById(req.params.id);

    if(!movie) return res.status(404).send("Movie with the given ID was not found !");
    res.send(movie);
}); 




module.exports = router;