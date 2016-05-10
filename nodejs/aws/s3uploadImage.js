'use strict';
var mysql = require('mysql');

const http = require('http');
const convert = require('./convert');
const s3put = require('./s3put');
const filetype = require('./filetype');
const fs = require('fs');
const mkdirp = require('mkdirp');


// const bucketname = 'design-mplus-berioscore';
// const credentials = new AWS.SharedIniFileCredentials({
//     profile: 'berio-ashibuya'
// });
// AWS.config.credentials = credentials;
//
// let s3 = new AWS.S3();


const pool = mysql.createPool({
    host: '192.168.99.100',
    port: '3306',
    user: 'root',
    password: '',
    database: 'imslp'
});

// function uploadFile(remoteFilename, fileBuffer) {
//     //let metaData = getContentTypeByFile(fileName);
//     console.log('upload');
//     let metaData = 'image/pdf';
//
//     s3.putObject({
//         ACL: 'public-read',
//         Bucket: bucketname,
//         Key: remoteFilename,
//         Body: fileBuffer,
//         ContentType: metaData
//     }, function(error, response) {
//         console.log('uploaded file[' + remoteFilename + '] as [' + metaData + ']');
//         console.log(arguments);
//     });
// }

function getRemoteFile(link, imslpno) {


    mkdirp('./' + imslpno, function(err) {

        // path exists unless there was an error
        if (!err) {
            var pdffile = './' + imslpno + '/' + imslpno + '.pdf';
            var file = fs.createWriteStream(pdffile);
            console.log(pdffile);
            console.log(link);
            var req = http.get(link, function(res) {
                console.log(link);

                res.pipe(file);

                res.on('end', function() {
                    file.close();
                    console.log('End: ', pdffile);
                    filetype(pdffile, function(info) {
                        console.log(info);
                        if (info !== null) {
                            //Convert
                            convert(pdffile, function(err, stdout) {
                                if (err) {
                                    console.error(err);
                                }
                                console.log(stdout);
                                s3put(imslpno, function(err, data) {
                                    if (err) {
                                        console.error(err);
                                    }
                                    console.log(data);
                                });
                            });
                        }else{
                          console.log('ERROR PDF File: IMSLPNO > '+ imslpno);
                        }
                    });
                });
            });
            req.on('error', function(err) {
                console.log('Error: ', err);
            });
        } else {
            console.log(err);
        }
    });
}

//Main

let sql = 'select id , ImslpNo, pdfDirectLink from score where pdfDirectLink !="" limit 20';
//let sql = 'select id , ImslpNo, pdfDirectLink from score where id ="IMSLP15924"';
console.log(sql);
pool.query(sql, function(err, rows) {
    if (err) {
        console.log(err);
    }

    for (let i = 0; i < rows.length; i++) {
        getRemoteFile(rows[i].pdfDirectLink, rows[i].id);
    }
    pool.end();
});
