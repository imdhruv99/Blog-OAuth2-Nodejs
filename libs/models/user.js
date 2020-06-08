// Require Mongoose module for MongoDB and Crypto for encryption
var mongoose = require('mongoose');
var crypto = require('crypto');

// User Model Schema
var Schema = mongoose.Schema,
User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Encrypting password using crypto module, used `sha512` as a digest,
// it will do 10000 iterations and stored as string
User.methods.encryptPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

// get userId
User.virtual('userId').get(function() {
    return this.id;
});

// set hashedPassword and get plain password
User.virtual('password').set(function (password) {
    this._plainPassword = password;
    this.salt = crypto.randomBytes(128).toString('hex');
    this.hashedPassword = this.encryptPassword(password);
}).get(function() { return this._plainPassword; });

// check password
User.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

// Exporting Module as User
module.exports = mongoose.model('User', User);