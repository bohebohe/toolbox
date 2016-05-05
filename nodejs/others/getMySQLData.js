'use strict';
var mysql = require('mysql');


const pool = mysql.createPool({
  host     : '192.168.99.101',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'scraping'
});


let sql = 'select id , ImslpNo, pdfDirectLink from score where pdfDirectLink !="" limit 5';

pool.query( sql, function (err, rows) {
  if (err) throw err;

  console.log(rows);

  pool.end();
});
