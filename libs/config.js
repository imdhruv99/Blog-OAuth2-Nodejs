var nconf = require('nconf');

nconf.argv().env();

nconf.file('defaults', {
    file: process.cwd() + '/config.json'
});

module.exports = nconf;