//script test
// run: node s3.js

 'use strict';

//set parameters
const bucketname = '';
const filename = '';

const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({profile: 'berio-ashibuya'});
AWS.config.credentials = credentials;

let s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  if (err) { console.log('Error:', err); }
  else {
  for (var index in data.Buckets) {
    var bucket = data.Buckets[index];
    console.log('Bucket: ', bucket.Name, ' : ', bucket.CreationDate);
  }
  }
});


var params = {Bucket: bucketname, Key: filename};
var file = require('fs').createWriteStream('/tmp/file.jpg');
s3.getObject(params).createReadStream().pipe(file);
