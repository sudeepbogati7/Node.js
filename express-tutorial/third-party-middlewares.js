// There are several third party middleware function / modules which you can use in your website 

// one of them is , helmet -> Helps secure your apps by setting various HTTP headers
// also morgan : 	HTTP request logger

// importing the config module 
const config = require('config');

const Joi = require('joi');

const morgan = require('morgan');
const express = require('express');
const { func, valid } = require('joi');
const app = express();

console.log(`Application name : ${config.get('name')}`);
console.log(`Mail Host : ${config.get('mail.host')}`);
app.use(express.json());
// app.use(morgan('tiny'))

/*app.use(morgan((tokens, req, res) => {
    return[
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req,res),
        tokens.res(req, res, 'content-length'),'-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}));*/


/*
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`app : ${app.get('env')}`);
*/

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled....');
}




/* Handeling HTTP get Requests */
const courses = [
    {id: 1, name: 'Sudeep'},
    {id: 2, name: 'Sunil'},
    {id: 3, name: 'Swastika'},
    {id: 4, name: 'Saduram'}
];
// PUT request / update the id 

app.put('/api/courses/:id',(req, res) => {

    //check for the 404 
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with the given ID was not found . ");

    // validation error -400
    const { error } = validationCheck(req.body)
    if(error){
        res.status(400).send(error.details[0].message);
        return; 
    }

    // Update if already exists and display the course 
    course.name = req.body.name;
    res.send(course);
});

function validationCheck(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(course);
}

app.listen(3000, () => console.log( "Listening to port 3000 ....."));

