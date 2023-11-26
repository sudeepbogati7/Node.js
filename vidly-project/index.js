const error = require('./middlewares/error');
const winston = require('winston');
require('winston-mongodb');
let Joi = require('joi');
Joi.objectId = require('joi-objectid');
const config  = require('config');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rental');
const users = require('./routes/users');
const auth = require('./routes/auth');

const express = require('express');
const joiObjectid = require('joi-objectid');
const app = express();



    
    
if(!config.get('myPrivateKey')){
    console.error("FATAL ERROR : The environment variable is not defined ! ");
    process.exit(1);
}

mongoose.connect('mongodb://127.0.0.1:27017/vidly')
.then(() => console.log("Successfully connected to mongoDB ...."))
.catch(err => console.log('Something went wrong !', err.message));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error); //using error middleware at the last , do notice 


const logger= winston.createLogger({
    level : 'info',
    format : winston.format.simple(),
    transports : [
        new winston.transports.File({filename : 'logger.log'}),
        new winston.transports.MongoDB({db : 'mongodb://127.0.0.1:27017/vidly'})
    ]
});

process.on('uncaughtException', ex =>{
    console.log("Uncaught error occurred ");
    logger.error(`Uncaught execption : ${ex.message}`);
    // process.exit(1);
});

process.on('unhandledRejection', (reason)=>{
    logger.error(`Unhandled Rejection :  ${reason.message}`);
});


try{
    throw new Error('This is a simulated eroor ');
}
catch(err){
    logger.error('Uncaught exception  ', err);
}


Promise.reject(new Error("unhaldled promise rejection "));

throw new Error('This is an example of Uncaught exceptions ! '); // this is an example , if we caught an exception after we define and winston error 




const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));