// Required package mongoose for MongoDB
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Image Schema for Blog
var Image = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: {
        type: String, 
        required: true 
    }
});

// Blog Schema
var Blog = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    // Merging Image Schema in Blog or calling Image Schema
    images: [Image],
    modified: { 
        type: Date, 
        default: Date.now 
    }
});

// Setting Blog Title Lenght
Blog.path('title').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

// Exporting Module as Blog
module.exports = mongoose.model('Blog', Blog);