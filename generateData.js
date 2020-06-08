// Require Package
var faker = require('faker');

// Importing Logging and  Configuration File
var log = require('./libs/log')(module);
var config = require('./libs/config');

// Importing Database connection
var db = require('./libs/db/mongoose');

// Importing Models
var User = require('./libs/models/user');
var Client = require('./libs/models/client');
var AccessToken = require('./libs/models/accessToken');
var RefreshToken = require('./libs/models/refreshToken');

User.deleteMany({}, function (err) {
    var user = new User({
        username: config.get('default:user:username'),
        password: config.get('default:user:password')
    });

    user.save(function (err, user) {
        if (!err) {
            log.info('New user - %s:%s', user.username, user.password);
        } else {
            return log.error(err);
        }
    });
});

Client.deleteMany({}, function (err) {
    var client = new Client({
        name: config.get('default:client:name'),
        clientId: config.get('default:client:clientId'),
        clientSecret: config.get('default:client:clientSecret')
    });

    client.save(function (err, client) {

        if (!err) {
            log.info('New client - %s:%s', client.clientId, client.clientSecret);
        } else {
            return log.error(err);
        }

    });
});

AccessToken.deleteMany({}, function (err) {
    if (err) {
        return log.error(err);
    }
});

RefreshToken.deleteMany({}, function (err) {
    if (err) {
        return log.error(err);
    }
});

setTimeout(function () {
    db.disconnect();
}, 3000);