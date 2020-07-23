const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 255,
        minlength: 2,
        required: true,
    },

    price: {
        type: String,
        maxlength: 255,
        minlength: 2,
        required: false,
    },
    currency: {
        type: String,
        maxlength: 255,
        minlength: 2,
        required: false,
    },

    region: {
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
    imgUrl2: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },
    imgUrl3: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },
    imgUrl4: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },
    imgUrl5: {
        type: String,
        maxlength: 1500,
        minlength: 2,
        required: false,
    },

    state: {
        type: String,
        maxlength: 255,
        minlength: 2,
        required: true,
    },

    desc: {
        type: String,
        maxlength: 5000,
        minlength: 2,
        required: false,
    },

    country: {
        type: String,
        maxlength: 255,
        minlength: 2,
        required: false,
    },

    role: {
        type: String,
        maxlength: 255,
        minlength: 2,
        required: false,
    },

    date: {
        type: Date,
        default: Date.now()
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

module.exports = mongoose.model('Post', postSchema)