 'use strict';

var express = require('express');
var app = express();

app.get('/', function (req, res) {
      res.setHeader('Access-Control-Allow-Origin', 'http://192.168.4.12:5010/');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Content-Security-Policy', 'script-src "self" http://192.168.4.12:5010/');
      //console.log(req);
      console.log(req.query.debug);
      res.send('debug log ok');
});


app.listen(5000, function () {
      console.log('Example app listening on port 5000!');
});
