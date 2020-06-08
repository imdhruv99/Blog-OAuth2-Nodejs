// Required package mongoose for MongoDB
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AccessToken = new Schema({
    userId: {
        type: String,
        required: true
    },

    clientId: {
        type: String,
        required: true
    },

    token: {
        type: String,
        unique: true,
        required: true
    },

    created: {
        type: Date,
        default: Date.now
    }
});

// Exporting Module as AccessToken
module.exports = mongoose.model('AccessToken', AccessToken);