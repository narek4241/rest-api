const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/signup', async(req, res)=>{
    try {
        const existUser = await User.findOne({email: req.body.email});
        if(existUser){
            res.status(400).send({error: 'This email already exists'})
            return;
        }
        const user = new User(req.body);
        const data = await user.save();
        // console.log(data);
        res.send(data);
    } catch (error) {
        res.status(400).send({error: 'Something went wrong'})
    }
})

router.post('/signin', async(req, res)=>{
    try {
        const userExists = await User.findOne({email: req.body.email});
        if(!userExists){
            res.status(400).send({error: 'This email does not exist'})
            return;
        }
        // userExists is object
        if(req.body.password !== userExists.password){
            res.status(400).send({error: 'Type right password'})
            return;
        }
        res.send({message: 'login succeed'});
    } catch (error) {
        res.status(400).send({error: 'Something went wrong'})
    }
})


router.get('/profile', (req, res)=>{
    console.log('profile');
    // profile
})


module.exports = router;


























