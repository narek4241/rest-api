const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const jwt = require('jsonwebtoken');
const check = require('./checkToken');


router.get('/', async (req, res) => {
    try {
        const data = await Post.find().populate('userId', 'firstname lastname email contact date avatar info _id');
        res.send(data);
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong' });
    }
})

router.get('/post/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Post.findById(id).populate('userId', 'firstname lastname email contact date avatar info _id');
        res.send(data);
    } catch (error) {
        res.status(400).send({ error: 'Something went wrong' });
    }
})

router.post('/add', check, async (req, res) => {
    const profileData = { ...req.body };
    profileData.userId = req.user;
    try {
        const post = new Post(profileData);
        const data = await post.save()
        res.send(data)
    } catch (error) {
        res.status(400).send({ error: "Something went wrong" })
    }
})

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const data = await Post.find({ userId: userId }).populate('userId', 'firstname lastname email contact date avatar info _id');
        res.send(data);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})

router.get('/profile', check, async (req, res) => {
    try {
        const data = await Post.find({ userId: req.user }).populate('userId', 'firstname lastname email contact date avatar info _id');
        res.send(data);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})

router.get('/del/:id', check, async (req, res) => {
    try {
        const post = await Post.remove({ _id: req.params.id })
        res.send('The Post has been deleted.')
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})

router.get('/update/:id', check, async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate({ _id: req.params.id }, { "title": req.body.title }).populate('userId', 'firstname lastname email contact date avatar info _id');
        const data = await post.save();
        // #lb update DOES, but res sends from 2nd click, in spite of await
        res.send(data);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})

router.get('/cat/:cat', async (req, res) => {
    try {
        let data;
        if (req.params.cat == 'all') {
            data = await Post.find().populate('userId', 'firstname lastname email contact date avatar info _id');
        } else (
            data = await Post.find({ cat: req.params.cat }).populate('userId', 'firstname lastname email contact date avatar info _id')
        )
        res.send(data);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})

router.get('/cats', async (req, res) => {
    try {
        const data = await Post.find();

        const allPostsTitles = [];
        data.forEach((elem) => allPostsTitles.push(elem.cat));

        res.send(allPostsTitles);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})

router.get('/cats/notempty', async (req, res) => {
    try {
        const allCats = await Post.find();

        let allNotEmptyCats = [];

        allCats.forEach((elem) => allNotEmptyCats.push(elem.cat));
        allNotEmptyCats = [...new Set(allNotEmptyCats)];

        res.send(allNotEmptyCats);
    } catch (error) {
        console.log(error);
        res.status(400).send('Something went wrong');
    }
})

router.get('/search/:query', async (req, res) => {
    try {
        // #task try to get shorter way to do this
        // #improve #dirty #hardCode

        const allPosts = await Post.find();

        const allPostsTitles = [];
        const allPostsDescs = [];
        const allPostsCats = [];
        const allPostsPrices = [];
        const allPostsCurrency = [];

        allPosts.forEach((elem) => allPostsTitles.push(elem.title));
        allPosts.forEach((elem) => allPostsDescs.push(elem.desc));
        allPosts.forEach((elem) => allPostsPrices.push(elem.price));
        allPosts.forEach((elem) => allPostsCats.push(elem.cat));
        allPosts.forEach((elem) => allPostsCurrency.push(elem.currency));

        const filteredTitles = await allPostsTitles.filter(title => new RegExp(`${req.params.query}`, 'i').test(title));
        const filteredDescs = await allPostsDescs.filter(desc => new RegExp(`${req.params.query}`, 'i').test(desc));
        const filteredPrices = await allPostsPrices.filter(price => new RegExp(`${req.params.query}`, 'i').test(price));
        const filteredCats = await allPostsCats.filter(cat => new RegExp(`${req.params.query}`, 'i').test(cat));
        const filteredCurrencys = await allPostsCurrency.filter(currency => new RegExp(`${req.params.query}`, 'i').test(currency));

        let data = [];

        for (const i in filteredTitles) {
            const fileteredPostArr = await Post.find({ title: filteredTitles[i] });
            // #found bug is pushing only [0] not all [1],[2]...
            for (let obj of fileteredPostArr) {
                data.push(obj);
            }
        }
        for (const i in filteredDescs) {
            const fileteredPostArr = await Post.find({ desc: filteredDescs[i] });
            for (let obj of fileteredPostArr) {
                data.push(obj);
            }
        }
        for (const i in filteredPrices) {
            const fileteredPostArr = await Post.find({ price: filteredPrices[i] });
            for (let obj of fileteredPostArr) {
                data.push(obj);
            }
        }
        for (const i in filteredCats) {
            const fileteredPostArr = await Post.find({ cat: filteredCats[i] });
            for (let obj of fileteredPostArr) {
                data.push(obj);
            }
        }
        for (const i in filteredCurrencys) {
            const fileteredPostArr = await Post.find({ currency: filteredCurrencys[i] });
            for (let obj of fileteredPostArr) {
                data.push(obj);
            }
        }


        let filteredPostsId = [];

        for (let i of data) {
            filteredPostsId.push(i.id);
        }
        // removes duplicates
        filteredPostsId = [...new Set(filteredPostsId)];

        data = [];

        for (let i of filteredPostsId) {
            const fileteredPostArr = await Post.find({ _id: i });
            // elem'[0]' avoids from nesting array to array, [0] allowed (id-s are unique)
            data.push(fileteredPostArr[0]);
        }

        res.send(data);
    } catch (error) {
        res.status(400).send('Something went wrong');
    }
})



module.exports = router;