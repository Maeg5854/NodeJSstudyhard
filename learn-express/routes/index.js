const express = require('express');
//const User = require('../models/user');
const User = require('../schema/user');

const router = express.Router();

router.get('/', async (req,res,next)=> {
    try {
        //const users = await User.findAll();
        const users = await User.find({});
        res.render('mongoose', {users});
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;