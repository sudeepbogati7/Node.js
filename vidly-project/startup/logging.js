const winston = require('winston');
const winstonMongoDB = require('winston-mongodb');
const { addColors } = require('winston/lib/winston/config');
require('express-async-errors');

module.exports = function(){
    
    process.on('uncaughtException', ex =>{
        winston.error("Uncaught exception : ", ex);
    });
    
    process.on('unhandledRejection', (reason)=>{
        winston.error(`Unhandled Rejection :  ${reason.message}`);
    });
    
    winston.add(new winston.transports.Console({colorize : true , format : winston.format.simple()}));
    winston.add(new winston.transports.File({filename : 'logger.log'}));
    winston.add(new winstonMongoDB.MongoDB({
        level: 'error',
        db: 'mongodb://localhost:27017/vidly',  // Correct property name is 'db'
        options: { useUnifiedTopology: true },
        collection: 'logs',
      }));   
    
}

