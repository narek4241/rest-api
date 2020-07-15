const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        maxlength: 255,
        minlength: 2,
        required: false,
    },
    lastname: {
        type: String,
        maxlength: 255,
        minlength: 2,
        required: false,
    },
    avatar: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },
    username: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },
    email: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: true,
    },
    password: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: true,
    },
    coverImgUrl: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    info: {
        type: String,
        maxlength: 5000,
        minlength: 2,
        required: false,
    }
})

module.exports = mongoose.model('User', userSchema)