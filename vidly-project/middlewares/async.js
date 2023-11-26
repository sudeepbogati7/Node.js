module.exports = function (handler){
    return async (err, req, res, next) =>    {
        try{
            await handler(req, res);
        }
        catch(ex){
            res.status(500).send("opps ! Something went wrong ......");
        }
    }
}
