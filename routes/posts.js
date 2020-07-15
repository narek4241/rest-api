const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    console.log('posts');
})

router.get('/post/:id', (req, res)=>{
    console.log('post yst id-i');
})

router.get('/user/:userId', (req, res)=>{
    console.log('posts yst user-i userId-i');
})

router.get('/profile', (req, res)=>{
    console.log('profile');
})

module.exports = router;


























