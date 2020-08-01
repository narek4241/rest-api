const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    // select
    cat: {
        type: String,
        maxlength: 255,
        // minlength: 2,
        required: false,
    },

    // select
    region: {
        type: String,
        maxlength: 255,
        // minlength: 2,
        required: false,
    },

    // radio
    type: {
        type: String,
        maxlength: 255,
        // minlength: 2,
        required: false,
    },

    // radio
    state: {
        type: String,
        maxlength: 255,
        // minlength: 2,
        required: false,
    },

    price: {
        type: String,
        maxlength: 255,
        // minlength: 2,
        required: false,
    },
    // select
    currency: {
        type: String,
        maxlength: 255,
        // minlength: 2,
        required: false,
    },

    title: {
        type: String,
        maxlength: 255,
        // minlength: 2,
        required: true,
    },

    desc: {
        type: String,
        maxlength: 5000,
        // minlength: 2,
        required: false,
    },

    //  link (add upload later)
    imgUrl: {
        type: String,
        maxlength: 1500,
        // minlength: 2,
        required: false,
    },
    imgUrl2: {
        type: String,
        maxlength: 1500,
        // minlength: 2,
        required: false,
    },
    imgUrl3: {
        type: String,
        maxlength: 1500,
        // minlength: 2,
        required: false,
    },
    imgUrl4: {
        type: String,
        maxlength: 1500,
        // minlength: 2,
        required: false,
    },
    imgUrl5: {
        type: String,
        maxlength: 1500,
        // minlength: 2,
        required: false,
    },

    role: {
        type: String,
        maxlength: 255,
        // minlength: 2,
        required: false,
    },
    contact: {
        type: String,
        maxlength: 255,
        // minlength: 2,
        required: true,
    },

    // select
    country: {
        type: String,
        maxlength: 255,
        // minlength: 2,
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