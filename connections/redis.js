
const redis = require('redis');
const client = redis.createClient({
    host: 'Host',
    port: 'Port',
    password: 'Password'
});

module.exports = client