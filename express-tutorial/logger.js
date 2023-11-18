function log(req, res, next){
    console.log('Loading .......');
    next();
}

module.exports = log;