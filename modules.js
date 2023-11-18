// Import modules from local storage

// to access the module 
// const logger  = require('./logger');
// const log = require('./logger')
// log("This is message.");
// log("message");
// logger.MyUrl;




//Built-in Modules , there are many .......
/*// path module , 

const path = require('path');
const pathObj = path.parse(__filename);
console.log(pathObj);
*/

/*the result: 
{
  root: '/',
  dir: '/home/sudeep/Documents/Web/Node.js Tutorial',
  base: 'app.js',
  ext: '.js',
  name: 'app'
}
*/
/*
const dirObj = path.parse(__dirname);
console.log(dirObj);
*/


/*// -------------OS Module-------------------------

const os = require('os');
const { fstat } = require('fs');
const totalMem = os.totalmem();
const freeMem = os.freemem();

console.log(`Total Mem : ${totalMem}`);
console.log(`Free Memory: ${freeMem}`);
*/
// ------------File System Module ---------------

/*// Synchronous , readdir:
const fs = require('fs');
const files = fs.readdirSync('./');
console.log(files);
*/

/*//Asynchronous , readdir
fs.readdir('./', function(err, files){
    if(err) console.log("Error: ", err);
    else console.log("Result : ", files);
})*/

/*Result : 
Result :  [ 'app.js', 'logger.js', 'modules.js' ]
*/

// ---------Event Module ---------------

/*// What is an event ? 
// --> A signal that something has happened. 

const EventEmitter = require('events');
const { emit } = require('process');
const emitter = new EventEmitter(); //because the events module is a class 
*/


/*event listener
// First we need to add a listener :
emitter.on('message', function(){
    console.log("Listener called !! ");
});


// then raise an event: 
emitter.emit('message'); // emit means , making a noise, produce signalling 
*/

/*
emitter.on("LoggedIn", (eventArgs) => {
    console.log("Listener ", eventArgs);
});

// raise an event 
emitter.emit("LoggedIn",{id:1 , name: 'Sudeep Bogati', url: 'https://'} );
*/



/*Event listener from logger.js module

const EventEmitter = require('events');

const Logger = require('./logger');
const logger = new Logger();

logger.on("message", (args) => {
    console.log('listener called', args);
});

logger.log('this is log message ');

*/


/* listening to port 2000
const http = require('http');
const server = http.createServer((request, response) => {
    if(request.url === '/'){
        response.write('Hello World');
        response.end();
    }
    if(request.url === '/api/courses'){
        response.write(JSON.stringify([1,2,3,4]));
        response.end();
    }
});


server.listen(2000);
console.log("Listening to port 2000 ......");
*/

