const express = require('express');
const router = express.Router();
const Post = require('../model/post');


router.get('/', async(req, res)=>{
    try {
        const data = await Post.find();
        res.send(data);
    } catch (error) {
        res.status(400).send({error: 'Something went wrong'});
    }
})

router.get('/post/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const data = await Post.findById(id);
        res.send(data);
    } catch (error) {
        res.status(400).send({error: 'Something went wrong'});
    }
})

router.post('/add',async(req,res)=>{
    try {
        const post = new Post(req.body)
        const data = await post.save()
        res.send(data)
    } catch (error) {
        res.status(400).send({error: "Something went wrong"})
    }
})

router.get('/user/:userId', (req, res)=>{
    // console.log('posts yst user-i userId-i');
})

router.get('/profile', (req, res)=>{
    // console.log('profile');
})

module.exports = router;

























