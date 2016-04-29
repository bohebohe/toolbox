var fs = require('fs');
var app = require('http').createServer(function(req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>プロセスA</h1>");
          res.end(fs.readFileSync('index.html'));
}).listen(3001);

var io = require('socket.io').listen(app);
var redis = require('socket.io-redis'); //++追記
io.adapter(redis({ host: 'localhost', port: 6379 })); //++追記

io.sockets.on('connection', function(socket) {
      socket.on('msg', function(data) {
              io.sockets.emit('msg', data);
                  console.log('receive:', data);
                    });
});
