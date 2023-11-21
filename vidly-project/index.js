const mongoose = require('mongoose');


const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');

const express = require('express');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/vidly')
    .then(() => console.log("Successfully connected to mongoDB ...."))
    .catch(err => console.log('Something went wrong !', err.message));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

