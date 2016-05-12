'use strict';

//http://blog.katworksgames.com/2014/01/26/nodejs-deploying-files-to-aws-s3/

//set parameters

const AWS = require('aws-sdk');
const async = require('async'),
    fs = require('fs'),
    path = require('path');
const rmdir = require('rmdir');

const bucketname = 'design-mplus-berioscore';
const credentials = new AWS.SharedIniFileCredentials({
    profile: 'berio-ashibuya'
});
AWS.config.credentials = credentials;

let s3 = new AWS.S3();

module.exports = function(imslpid, callback) {

    var directoryName = './' + imslpid;
    var directoryPath = path.resolve(directoryName);

    var files = fs.readdirSync(directoryPath);
    //console.log(files.length);
    var cntUpload = 0;
    async.map(files, function(f, cb) {
        var filePath = path.join(directoryPath, f);
        //console.log(f);

        var options = {
            Bucket: bucketname,
            Key: imslpid + '/' + f,
            Body: fs.readFileSync(filePath),
            ACL: 'public-read'
        };

        s3.putObject(options, function(err, data) {
            if (err){
              console.log(err, err.stack); // an error occurred
              cb(err);
            }
            cntUpload++;
            //console.log('Length: ' + files.length);
            //console.log('Count : ' + cntUpload);
            if(files.length === cntUpload){
              var dir = __dirname +'/'+ imslpid;
              console.log('Rmdir :' + dir);
              rmdir(dir);
            }

        });


    }, function(err, results) {
        if (err) {
          console.error(err);
        }
        console.log(results);
    });
};
