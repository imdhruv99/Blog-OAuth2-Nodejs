// Required package mongoose for MongoDB
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
Client = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    }
});

// Exporting module as Client
module.exports = mongoose.model('Client', Client);