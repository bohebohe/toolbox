'use strict';

var mysql = require('mysql');
var s3get = require('./s3get');


const pool = mysql.createPool({
    host: '192.168.2.42',
    port: '3306',
    user: 'root',
    password: '',
    database: 'musik'
    // host: '192.168.99.100',
    // port: '3306',
    // user: 'root',
    // password: '',
    // database: 'imslp'
});

var execUpdate = function(sql){
  pool.query(sql, function(err, rows) {
      console.log(sql);
      if (err) {
          console.log(err);
      }

      console.log(rows.OkPacket.affectedRows);
  });
};


s3get(function(data){
  //console.log(data);

  for (var index in data) {
    //console.log("obj." + index + " = " + data[index].Prefix);
    var id =  data[index].Prefix.substring( 0, data[index].Prefix.length-1 );
    //console.log(id);
    let sql = 'update score set scoreimgFlg=1  where id ="' + id + '"';
    execUpdate(sql, data.length);

  }
  //pool.end();

});
