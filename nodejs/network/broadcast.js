
// var ip= '255.255.255.255';
// var port = '12345';
//
// var dgram = require('dgram');
// var message = new Buffer("Some bytes");
// var client = dgram.createSocket("udp4");
// client.send(message, 0, message.length, port, ip);
// client.close();


var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var testMessage = "[hello world] pid: " + process.pid;
var broadcastAddress = '255.255.255.255';
var broadcastPort = 12345;

// socket.bind(broadcastPort, '0.0.0.0');
// socket.setBroadcast(true);

socket.bind( function() { socket.setBroadcast(true);} );

socket.on("message", function ( data, rinfo ) {
	console.log("Message received from ", rinfo.address, " : ", data.toString());
});

//setInterval(function () {
	socket.send(new Buffer(testMessage),
			0,
			testMessage.length,
			broadcastPort,
			broadcastAddress,
			function (err) {
				if (err) console.log(err);

				console.log("Message sent");
			}
	);
//}, 1000);
