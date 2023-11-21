const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const {Rental , validate} =  require('../models/rentals');
const { async } = require('jshint/src/prod-params');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customers');

Fawn.init('mongodb://127.0.0.1:27017/vidly');


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


    new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id : movie._id}, {
            $inc : {numberInStock : -1} 
        })
        .run()
        .then(() => console.log("Transaction Successful"))
        .catch(err => console.error(err.message));
    res.send(rental);
});

router.get('/:id', async(req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send("Oops !rental with the given ID was not found !");

    res.send(rental);
});     

module.exports = router;