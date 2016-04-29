'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ port: 3000});

console.log(server.info);

var validateFunction = function (token, callback) {

    // Use a real strategy here to check if the token is valid
    if (token === 'abc456789') {
        callback(null, true, userCredentials);
    }
    else {
        callback(null, false, userCredentials);
    }
};

server.register({
  register: require('hapi-serve-s3'),
}, function(err) {
  if (err) {
    throw err;
  }
});

server.register(require('hapi-auth-bearer-simple'), function (err) {

    if (err) {
        throw err;
    }

    server.auth.strategy('bearer', 'bearerAuth', {
        validateFunction: validateFunction
    });

    // Add a standard route here as example
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            reply({ success: true });
        },
        config: {
            auth: {
                strategy: 'bearer',
                scope: 'user' // or [ 'user', 'admin' ]
            }
        }
    });

    server.start(function (err) {

        if (err) {
            throw err;
        }

        server.log([],'Server started at: ' + server.info.uri);
    });
});
