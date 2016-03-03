var dgram = require("dgram");

var server = dgram.createSocket("udp4");


server.on("message", function (msg, rinfo) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);


});

server.on("listening", function (message, rinfo) {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
  var delay = 2000000;
    // Echo the message back to the client.
  setTimeout(function() {
    server.send(message, 0, message.length, rinfo.port, rinfo.address, function(err, bytes) {
      console.log(err, bytes);
    });
  }, delay);
});

server.bind(5555);
// server listening 0.0.0.0:1667
