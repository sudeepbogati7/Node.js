
/*
var url = 'https://sudeepbogati7.github.io/log';
function log(mesasge){
    console.log(mesasge);
}
        
console.log(__filename);
console.log(__dirname);
// export the module
// module.exports.log = log;
module.exports = log; // you are directly exporting a method 
*/



// Using Event listener Extends 

const EventEmitter = require('events');


class Logger extends EventEmitter {
    log (msg){
        //send HTTP request 
        console.log(msg);

        //raise an event 
        this.emit("message", {id:1, url : 'http://'});
    }
}

module.exports = Logger; 