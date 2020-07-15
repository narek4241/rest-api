const express = require('express');
const router = express.Router();
const Post = require('../model/post');


router.get('/', async(req, res)=>{
    // console.log('posts')
})

router.get('/post/:id', async(req, res)=>{
    // console.log('post by id')
})

router.post('/add', async(req, res)=>{
    // console.log('add post')
})

router.get('/user/:userId', (req, res)=>{
    // console.log('posts yst user-i userId-i');
})

router.get('/profile', (req, res)=>{
    // console.log('profile');
})

module.exports = router;

























