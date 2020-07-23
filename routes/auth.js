const express = require('express');
const router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const check = require('./checkToken');
const sgMail = require('@sendgrid/mail');


router.post('/signup', async (req, res) => {
    try {
        const existUser = await User.findOne({ email: req.body.email });
        if (existUser) {
            res.status(400).send({ error: 'This email already exists' })
            return;
        }
        const user = new User(req.body);
        const data = await user.save();

        // send mail
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // const msg = {
        //     to: req.body.email,
        //     from: 'narek.ghazaryan.g@tumo.org',
        //     subject: `Welcome Dear ${req.body.firstname ? req.body.firstname : 'User'}.`,
        //     html: `Thank You for your registration. &nbsp; Enjoy Scelet!`,
        // };
        // sgMail.send(msg);

        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Something went wrong' })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) {
            res.status(400).send({ error: 'This email does not exist' })
            return;
        }
        // userExists is object
        if (req.body.password !== userExists.password) {
            res.status(400).send({ error: 'Type right password' })
            return;
        }
        const token = jwt.sign({ id: userExists._id }, 'tumo_students');
        res.send({ auth_token: token });
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong' })
    }
})


router.get('/profile', check, async (req, res) => {
    try {
        const data = await User.findById(req.user);

        const token = jwt.sign({password: data.password}, 'tumo_students');
        data.password = token;

        res.send(data);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})


module.exports = router;


























