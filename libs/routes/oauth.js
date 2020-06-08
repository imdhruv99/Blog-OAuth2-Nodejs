// Require Package
var express = require('express');
var router = express.Router();

// Importing Oauth2 Functionality implemented in auth directory
var oauth2 = require('../auth/oauth2')

// Importing Logging file
var log = require('../log');

// give us Oauth2 Token
router.post('/token', oauth2.token);

module.exports = router;