const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const express = require('express');
const _ = require('lodash');
const { async } = require('jshint/src/prod-params');
const router = express.Router();
const mongoose = require('mongoose');

// custom modules 
const { validate , User } = require('../models/users');



router.get('/', async(req, res) => {
    const user = await User.find().sort('username');
    if(user.length == 0) return res.status(404).send("Opps ! NO USERS FOUND !! ");
    res.send(user);
});


router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email : req.body.email});
    if(user ) return res.status(400).send("Email aready exists! ");

    newUser = new User(_.pick(req.body, ['username', 'email', 'password']));
    
    //hashing password using bcrypt 
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    // Simple way 

    // res.send({
    //     username : newUser.username,
    //     email : newUser.email,
    //     password : newUser.password
    // });

    const token = jwt.sign({_id : newUser._id}, config.get('myPrivateKey'));

    // Using lodash 
    // res.send(_.pick(newUser, [ 'email', 'password']));


    //setting response header
    res.header('x-authentication-token', token).send(_.pick(newUser, ['email', 'password']));
});
module.exports = router;