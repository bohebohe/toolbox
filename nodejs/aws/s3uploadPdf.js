'use strict';
var mysql = require('mysql');
const AWS = require('aws-sdk');
//const fs = require('fs');
const request = require('request');

const bucketname = 'design-mplus-berioscore';
const credentials = new AWS.SharedIniFileCredentials({
    profile: 'berio-ashibuya'
});
AWS.config.credentials = credentials;

let s3 = new AWS.S3();


const pool = mysql.createPool({
  host     : '192.168.99.101',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'scraping'
});

function uploadFile(remoteFilename, fileBuffer) {
    //let metaData = getContentTypeByFile(fileName);
    console.log('upload');
    let metaData = 'image/pdf';

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

function getRemoteFile(link, filename) {

    var rem = request(link);
    var postData = '';
    rem.on('data', function(chunk) {
        postData += chunk;

    });
    rem.on('end', function() {
        uploadFile(filename, postData);
        //res.end();
    });
}


let sql = 'select id , ImslpNo, pdfDirectLink from score where pdfDirectLink !="" limit 5';

let res =[];
pool.query( sql, function (err, rows) {
  if (err) throw err;

  for(let i=0 ;i< rows.length; i++){
    getRemoteFile(rows[i].pdfDirectLink, rows[i].ImslpNo);
  }
  pool.end();
});
