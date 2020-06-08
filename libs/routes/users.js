// Require Packages
var express = require('express');
var passport = require('passport');
var router = express.Router();

// Importing MongoDB connection 
var db = require('../db/mongoose');

// api /info authenticate user using BearerStrategy
router.get('/info', passport.authenticate('bearer', { session: false }),
    function (req, res) {
        // req.authInfo is set using the `info` argument supplied by
        // `BearerStrategy`. It is typically used to indicate scope of the token,
        // and used in access control checks. For illustrative purposes, this
        // example simply returns the scope in the response.
        res.json({
            user_id: req.user.userId,
            name: req.user.username,
            scope: req.authInfo.scope
        });
    }
);

// Exporting Modules
module.exports = router;