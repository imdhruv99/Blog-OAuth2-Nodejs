// Require Packages
var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');

// Setting default path
var libs = process.cwd() + '/libs/';

// Importing Configuration file, Logging file and DB Connection
var config = require(libs + 'config');
var log = require(libs + 'log')(module);
var db = require(libs + 'db/mongoose');

// Importing Models
var User = require('../models/user');
var AccessToken = require('../models/accessToken');
var RefreshToken = require('../models/refreshToken');

// Creating Oauth 2.0 Server
var server = oauth2orize.createServer();

// Generic Error Handler
var errFn = function (cb, err) {
    if (err) {
        return cb(err);
    }
};

// Destroy any old tokens and generates a new access and refresh token
var generateTokens = function (data, done) {

    // Curries in `done` callback so we don't need to pass it
    var errorHandler = errFn.bind(undefined, done),
        refreshToken,
        refreshTokenValue,
        token,
        tokenValue;

    RefreshToken.deleteMany(data, errorHandler);
    AccessToken.deleteMany(data, errorHandler);

    tokenValue = crypto.randomBytes(512).toString('hex');
    refreshTokenValue = crypto.randomBytes(512).toString('hex');

    data.token = tokenValue;
    token = new AccessToken(data);

    data.token = refreshTokenValue;
    refreshToken = new RefreshToken(data);

    refreshToken.save(errorHandler);

    token.save(function (err) {
        if (err) {

            log.error(err);
            return done(err);
        }
        done(null, tokenValue, refreshTokenValue, {
            'expires_in': config.get('security:tokenLife')
        });
    });
};

// Exchange username & password for access token
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {

    User.findOne({ username: username }, function (err, user) {

        if (err) {
            return done(err);
        }

        if (!user || !user.checkPassword(password)) {
            return done(null, false);
        }

        var model = {
            userId: user.userId,
            clientId: client.clientId
        };

        generateTokens(model, done);
    });

}));

// Exchange refreshToken for access token
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {

    RefreshToken.findOne({ token: refreshToken, clientId: client.clientId }, function (err, token) {
        if (err) {
            return done(err);
        }

        if (!token) {
            return done(null, false);
        }

        User.findById(token.userId, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            var model = {
                userId: user.userId,
                clientId: client.clientId
            };

            generateTokens(model, done);
        });
    });
}));

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens. Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request. Clients must
// authenticate when making requests to this endpoint.
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];