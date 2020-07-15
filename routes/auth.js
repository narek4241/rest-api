const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/signin', (req, res)=>{
    console.log('signin');
    // signin
})

router.post('/signup', async(req, res)=>{
    const user = new User(req.body);
    const data = await user.save();
    console.log(data);
})



router.get('/profile', (req, res)=>{
    console.log('profile');
    // profile
})


module.exports = router;


























