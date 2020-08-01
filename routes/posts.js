const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const jwt = require('jsonwebtoken');
const check = require('./checkToken');


router.get('/', async(req, res)=>{
    try {
        const data = await Post.find().populate('userId', 'firstname lastname email contact date avatar info _id');
        res.send(data);
    } catch (error) {
        res.status(400).send({error: 'Something went wrong'});
    }
})

router.get('/post/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const data = await Post.findById(id).populate('userId', 'firstname lastname email contact date avatar info _id');
        res.send(data);
        console.log(`dataBACKEND ${data}`);
    } catch (error) {
        res.status(400).send({error: 'Something went wrong'});
    }
})

router.post('/add', check,  async(req,res)=>{
    const profileData = {...req.body};
    console.log(`req.body.title ${req.body.title}`);
    console.log(`req.body._id ${req.body.id}`);

    // console.clear();
    // console.log(req.body);
    profileData.userId = req.user;
    try {
        const post = new Post(profileData);
        const data = await post.save()
        res.send(data)
    } catch (error) {
        console.log(`error ${error}`);
        res.status(400).send({error: "Something went wrong"})
    }
})

router.get('/user/:userId', async(req, res)=>{
    const userId = req.params.userId;
    try {
        const data = await Post.find({userId: userId}).populate('userId', 'firstname lastname email contact date avatar info _id');
        res.send(data);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})

router.get('/profile', check, async(req, res)=>{
    try {
        const data = await Post.find({userId: req.user}).populate('userId', 'firstname lastname email contact date avatar info _id');
        res.send(data);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})

router.get('/del/:id',check, async(req, res) => {
    try {
        const post = await Post.remove({_id: req.params.id})
        res.send('The Post has been deleted.')
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})

router.get('/update/:id',check, async(req, res) => {
    try {
        const post = await Post.findByIdAndUpdate({_id: req.params.id},{"title": req.body.title}).populate('userId', 'firstname lastname email contact date avatar info _id');
        const data = await post.save();
        // #lb update DOES, but res sends from 2nd click, in spite of await
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send('Something went wrong');
    }
})

router.get('/cat/:cat', async(req, res)=>{
    try {
        const data = await Post.find({cat: req.params.cat}).populate('userId', 'firstname lastname email contact date avatar info _id');
        res.send(data);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})




module.exports = router;

























