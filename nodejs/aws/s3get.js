'use strict';


const AWS = require('aws-sdk');
const bucketname = 'design-mplus-berioscore';
const credentials = new AWS.SharedIniFileCredentials({
    profile: 'berio-ashibuya'
});
AWS.config.credentials = credentials;

let s3 = new AWS.S3();

module.exports = function(callback) {

  var params = {
    Bucket: bucketname,/* required */
    MaxKeys:4000,
    Delimiter:'/'
  };

  s3.listObjects(params, function (err, data) {
    if(err)throw err;
    //console.log(data.CommonPrefixes);
    callback(data.CommonPrefixes);
  });

};
