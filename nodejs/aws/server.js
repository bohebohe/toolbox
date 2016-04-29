'use strict';

var Hapi = require('hapi');

var server = new Hapi.Server();

var AWS = require('aws-sdk');
//set parameters
const bucketname = '';
const filename = '';


var credentials = new AWS.SharedIniFileCredentials({profile: 'berio-ashibuya'});
AWS.config.credentials = credentials;
var s3 = new AWS.S3();

server.connection({ port: 3000});

console.log(server.info);

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/file.jpg',
        handler: function (request, reply) {
            var params = {Bucket: bucketname, Key:filename};
            s3.getObject(params, function(err, file){
                reply(file.Body).bytes(file.Body.length).type(file.ContentType);
            });

        }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
