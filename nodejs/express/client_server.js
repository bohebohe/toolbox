 'use strict';

var express = require('express');
var app = express();

// routes to serve the static HTML files
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/xhr.html');
});

app.listen(5010, function () {
      console.log('Example app listening on port 5010!');
});
