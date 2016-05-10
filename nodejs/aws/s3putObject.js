'use strict';

const AWS = require('aws-sdk');
const async = require('async'),
    fs = require('fs'),
    path = require('path');

module.exports = function(imslpid, cb) {

    const bucketname = 'design-mplus-berioscore';
    const credentials = new AWS.SharedIniFileCredentials({
        profile: 'berio-ashibuya'
    });
    AWS.config.credentials = credentials;

    let s3 = new AWS.S3();

    var directoryName = './' + imslpid;
    var directoryPath = path.resolve(directoryName);

    var files = fs.readdirSync(directoryPath);
    async.map(files, function(f, cb) {
        var filePath = path.join(directoryPath, f);
        console.log(f);

        var options = {
            Bucket: bucketname,
            Key: imslpid + '/' + f,
            Body: fs.readFileSync(filePath),
            ACL: 'public-read'
        };
        s3.putObject(options, cb);

    }, function(err, results) {
        if (err) console.error(err);
        console.log(results);
    });

};
