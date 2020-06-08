// Required package mongoose for MongoDB
var mongoose = require('mongoose');

// Setting Default Path
var libs = process.cwd() + '/libs/';

// Importing  Logging file and Configuration file
var log = require(libs + 'log')(module);
var config = require(libs + 'config');

// MongoDB Database Connection
mongoose.connect(
    config.get('mongoose:uri'), 
    { 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    }
);

var db = mongoose.connection;

// Checking for Errors
db.on('error', function (err) {
    log.error('Connection error:', err.message);
});

// Connection Notification
db.once('open', function callback() {
    log.info('Connected to DB!');
});

module.exports = mongoose;