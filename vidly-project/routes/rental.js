const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const {Rental , validate} =  require('../models/rentals');
const { async } = require('jshint/src/prod-params');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customers');


router.get('/', async(req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    if(rentals.length == 0) return res.status(404).send("Oops ! there is no rentals at the moment !");
    res.send(rentals);
});

router.post('/', async(req, res) =>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    const movie = await Movie.findById(req.body.movieId);

    let rental = new Rental({
        customer : {
            _id : customer._id,
            name : customer.name,
            phone : customer.phone, 
            isGold : customer.isGold
        },
        movie : {
            _id : movie._id,
            title : movie.title,
            numberInStock : movie.numberInStock, 
            dailyRentalRate : movie.dailyRentalRate,
            genre : movie.genre
        }
    });

    movie.numberInStock--;
    rental = await rental.save();
    res.send(rental);
});

router.get('/:id', async(req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send("Oops !rental with the given ID was not found !");

    res.send(rental);
});     

module.exports = router;