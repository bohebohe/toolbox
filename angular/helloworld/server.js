var express = require('express');
var app = express();
var path = require('path');

//console.log(__dirname);
// app.use('js', express.static(__dirname + '/js'));
// app.use('bower_components' , express.static(__dirname + '/bower_components'));


app.use('/', express.static(__dirname + '/'));
app.listen(3000, function() { console.log('listening')});
