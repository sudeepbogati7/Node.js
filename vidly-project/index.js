const winston = require('winston');
const express = require('express');
const app = express();

//startup middlewares (returned in function types , so must call it) 
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


const port = process.env.PORT || 4000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
