const morgan = require('morgan');
const express = require('express');
const app = express();
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
if(app.get('env') === 'developer'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled........'); //instead of using console.log('Morgan enabled ..........);
}

// if there's DB works 
dbDebugger('Connected to database ........');

app.listen(3000, () => console.log("listening to port 3000 ........."));
