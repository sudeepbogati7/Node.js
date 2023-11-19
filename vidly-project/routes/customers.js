const express = require('express');
const { Customer , validate} = require('../models/customers');
const { async } = require('jshint/src/prod-params');
const res = require('express/lib/response');
const string = require('joi/lib/types/string');
const router = express.Router();


// handling routes 

router.get('/', async(req, res) => {
    const customers =  await Customer.find().sort('name');
    res.send(customers);
});

router.post('/',async (req, res) => {
    const { error } = validate(req.body);
    if(error )  return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name : req.body.name,
        isGold : req.body.isGold,
        phone : req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
});

try{
    router.put('/:id', async(req, res) =>{
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        customer = await Customer.findByIdAndUpdate(req.params.id, {
            name : req.body.name,
            isGold : req.body.isGold,
            phone : req.body.phone
        }, {new : true} );
    
        if(!customer) return res.status(404).send("The customer with the given ID was not found !");
    
        res.send(customer);
    });
}
catch(err){
    console.error(err); 
    res.status(500).send("Internal Server Error");
}

router.delete('/:id', async(req,res) =>{
    customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(404).send("The customer with the given ID was not found !");

    res.send(customer);
}); 

router.get('/:id', async (req, res) =>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send("The customer with the given ID was not find !");
    res.send(customer);
});

module.exports = router;