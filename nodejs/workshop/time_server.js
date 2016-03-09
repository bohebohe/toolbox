var port = process.argv[2];
var net = require('net');
var strftime = require('strftime');
var server = net.createServer(function(connection) { //'connection' listener
  console.log('client connected');
  connection.on('end', function() {
    console.log('client disconnected');
  });
  //YYYY-MM-DD hh:mm
  //var date =
  console.log(strftime('%Y-%m-%d %H:%M'));
  connection.write(strftime('%Y-%m-%d %H:%M')+ '\r\n');
  connection.end();
});
server.listen(port, function() { //'listening' listener
  console.log('server bound');
});
