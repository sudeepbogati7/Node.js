const Joi = require('joi');
// reading the custom module (middlware function )
const logger = require('./logger');
const express = require('express');
const { func, valid } = require('joi');
const app = express();

// there are 3 main built-in middleware 
// 1. json
// 2.urleconded
// 3.static


app.use(express.json()); // this is also a middleware function


app.use(express.urlencoded({extended : true})); // accepts key:value pair 

app.use(express.static('public'));



/*// adding some custom middleware functions
app.use( function(req, res, next){
    console.log('Logging ...............');
    next(); 
});*/


/*app.use(function(req, res, next){
    console.log("Authenticating .......");
    next(); 
});*/

// creating a separate module (logger.js) and importing it here 

app.use(logger);
 



/*//get
app.get('/', (req, res)=>{
    res.send("Good Evening man ! ");
});

app.get('/about/',(req, res)=> {
    res.send("Welcome to about me section haha .......");
});


app.listen(3000, () => console.log("Listening to port 3000............"));
*/

/*
app.get('/', (req, res) => {
    res.send('Got a post request.');
});
app.listen(3000, () => console.log("Listening to port 3000................"));
*/



/*Route Parameters
app.get('/api/courses/:id/:name', (req,res) => {
    res.send(req.params);
});

const port = process.env.port || 3000
app.listen(port , () => console.log(`listening to port ${port}......`));
*/








/* Handeling HTTP get Requests */
const courses = [
    {id: 1, name: 'Sudeep'},
    {id: 2, name: 'Sunil'},
    {id: 3, name: 'Swastika'},
    {id: 4, name: 'Saduram'}
];
app.get('/api/courses', (req, res)=> {
    res.send(courses);
});
/*
app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send("The course with the given ID was not found . ");
    res.send(course);
});
app.listen(3000, () => console.log("Listening to port 3000 ......."));
 */













// adding a post request

app.post('/api/courses/', (req, res) => {
    const { err } = validationCheck(req.body);

    let course = {
        id : courses.length + 1,
        name : req.body.name
    };
    if(err){
        // 400 error bad request
        res.status(400).send(err.details[0].message);
        return; 
    }
    courses.push(course);
    res.send(course);
    
});
app.listen(3000 , () => console.log("Listening to the port 3000 ....."));














/*// PUT request / update the id 

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
app.listen(3000, () => console.log( "Listening to port 3000 ....."));
*/
function validationCheck(course){
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });
    return schema.validate(course);
}
























/*// Handling Delete Requests

app.delete('/api/courses/:id', (req, res) =>{
    // check for 404
    const course = courses.find( c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with the given ID was not found . ");

    //delete the course 
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return the deleted course

    res.send(course);
});

app.listen(3000 , () => console.log("Listening to port 3000 ........"));
*/
