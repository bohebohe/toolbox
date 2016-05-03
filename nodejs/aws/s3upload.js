'use strict';

//http://blog.katworksgames.com/2014/01/26/nodejs-deploying-files-to-aws-s3/

//set parameters

const AWS = require('aws-sdk');
//const fs = require('fs');
const request = require('request');

const bucketname = 'design-mplus-berioscore';
const credentials = new AWS.SharedIniFileCredentials({
    profile: 'berio-ashibuya'
});
AWS.config.credentials = credentials;

let s3 = new AWS.S3();


function getRemotefile() {

    const remote = 'http://bohelabo.jp/wp-content/uploads/2016/03/docker-699x1024.jpeg';
    var rem = request(remote);
    var postData = '';
    rem.on('data', function(chunk) {
        console.log('chunk');
        postData += chunk;

    });
    rem.on('end', function() {
        uploadFile('bohe-docker2.jpg', postData);
        //res.end();
    });
}


function getContentTypeByFile(fileName) {
    var rc = 'application/octet-stream';
    var fn = fileName.toLowerCase();

    if (fn.indexOf('.html') >= 0) rc = 'text/html';
    else if (fn.indexOf('.css') >= 0) rc = 'text/css';
    else if (fn.indexOf('.json') >= 0) rc = 'application/json';
    else if (fn.indexOf('.js') >= 0) rc = 'application/x-javascript';
    else if (fn.indexOf('.png') >= 0) rc = 'image/png';
    else if (fn.indexOf('.jpg') >= 0) rc = 'image/jpg';
    else if (fn.indexOf('.jpeg') >= 0) rc = 'image/jpg';

    return rc;
}


function uploadFile(remoteFilename, fileBuffer) {
    //let metaData = getContentTypeByFile(fileName);
    console.log('upload');
    let metaData = 'image/jpg';

    s3.putObject({
        ACL: 'public-read',
        Bucket: bucketname,
        Key: remoteFilename,
        Body: fileBuffer,
        ContentType: metaData
    }, function(error, response) {
        console.log('uploaded file[' + remoteFilename + '] as [' + metaData + ']');
        console.log(arguments);
    });
}

getRemotefile();


//Thanks!
//http://blog.katworksgames.com/2014/01/26/nodejs-deploying-files-to-aws-s3/
