// Require Package
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');

// Setting Default Path
var libs = process.cwd() + '/libs/';
require(libs + 'auth/auth');

// Importing Configuration and Logging File
var config = require('./config');
var log = require('./log')(module);

// Imaporting oauth Module
var oauth2 = require('./auth/oauth2');

// Importing api route for testing
var api = require('./routes/api');

// Importing Users and Blog Routes
var users = require('./routes/users');
var blogs = require('./routes/blogs');

// Express Application
var app = express();

// json parsing 
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Initializing Passport
app.use(passport.initialize());

// Use of Different Routes
app.use('/', api);
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/blogs', blogs);
app.use('/api/oauth/token', oauth2.token);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({
        error: 'Not found'
    });
    return;
});

// Error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({
        error: err.message
    });
    return;
});

module.exports = app;