var port = process.argv[2];
var file = process.argv[3];
var fs = require('fs');

var http = require('http');

var server = http.createServer(function (req, res) {
   // request handling logic...
   var stream = fs.createReadStream(file);
   stream.pipe(res);
});

server.listen(port);
