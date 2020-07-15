const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 255,
        minlength: 2,
        required: false,
    },
    imgUrl: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },
    desc: {
        type: String,
        maxlength: 5000,
        minlength: 2,
        required: false,
    },
    text: {
        type: String,
        require: false,
    },
    coverImgUrl: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Post', postSchema)