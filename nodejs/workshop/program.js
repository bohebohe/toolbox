var port = process.argv[2];

var fs = require('fs');

var http = require('http');
var map = require('through2-map');
//POST request

var server = http.createServer(function (req, res) {
   // request handling logic...
   if(req.method === 'POST'){
     req.pipe(map(function(chunk){
       return chunk.toString().toUpperCase()
     })).pipe(res);
   }else{
     res.statusCode = 404;
     res.end();
   }
});

server.listen(port);
