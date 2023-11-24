const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const { async } = require('jshint/src/prod-params');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

const { User } = require('../models/users');

router.post('/', async(req, res) =>{
    const { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send("Invalid email or password !");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid e-mail or password ! ");

    // res.send("login Sucess !");    
    // Using JSON Web Token 

    const token = jwt.sign({_id : user._id}, config.get('myPrivateKey'));
    res.send(token);

});



function validate(req){
    const schema = {
        email : Joi.string().min(5).required().email(),
        password : Joi.string().min(8).required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;