'use strict';

var mysql = require('mysql');

const http = require('http');
const convert = require('./convert');
const s3put = require('./s3put');
const filetype = require('./filetype');
const fs = require('fs');
const mkdirp = require('mkdirp');


const pool = mysql.createPool({
    host: '192.168.2.42',
    port: '3306',
    user: 'root',
    password: '',
    database: 'musik'
});
let step = 2;


var upload = function (rows, i) {
  if (i >= rows.length) {
      return;
  }

  mkdirp('./' + rows[i].id, function(err) {

      // path exists unless there was an error
      if (!err) {
          var pdffile = './' + rows[i].id + '/' + rows[i].id + '.pdf';
          var file = fs.createWriteStream(pdffile);
          // console.log(pdffile);
          // console.log(rows[i].pdfDirectLink);
          var req = http.get(rows[i].pdfDirectLink, function(res) {
              res.pipe(file);
              res.on('end', function() {
                  file.close();
                  console.log('Step: '+ i + ' End: ', pdffile);
                  filetype(pdffile, function(info) {
                      console.log(info);
                      if (info !== null ) {
                          //Convert To Update
                          convert(pdffile, function(err, stdout) {
                              if (err) {
                                  console.error(err);
                              }
                              //console.log(stdout);
                              console.log('End: convert');
                              upload(rows, i + step);

                              s3put(rows[i].id, function(err) {
                                  if (err) {
                                      console.error(err);
                                  }
                                  //console.log(data);
                                  //console.log('Upload End: ');

                              });
                          });
                      }else{
                        console.log('ERROR PDF File: IMSLPNO > '+ rows[i].pdfDirectLink);
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
};

//Main

let sql = 'select id , ImslpNo, pdfDirectLink from score where pdfDirectLink !="" and youtubeFlg= 0 and mxmlFlg = 0 order by id  limit 0 ,20';
//let sql = 'select id , ImslpNo, pdfDirectLink from score where id ="IMSLP15924"';
console.log(sql);
pool.query(sql, function(err, rows) {
    if (err) {
        console.log(err);
    }
//rows.length
    for (let i = 0; i < step; i++) {
        upload(rows, i);
    }
    pool.end();
});
