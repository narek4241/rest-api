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

    email: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: true,
    },

    contact:{
        type: String,
        maxlength: 255,
        minlength: 2,
        required: false,
    },

    password: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now()
    },

    // user will add these after signup
    avatar: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },

    info: {
        type: String,
        maxlength: 5000,
        minlength: 2,
        required: false,
    },
})

module.exports = mongoose.model('User', userSchema)