//get remote file
'use strict';

var request = require('request');
const fs = require('fs');
var file = fs.createWriteStream('sample.jpeg');

const remote = 'http://bohelabo.jp/wp-content/uploads/2016/03/docker-699x1024.jpeg';
var rem = request(remote);
rem.on('data', function(chunk) {
  // instead of loading the file into memory
  // after the download, we can just pipe
  // the data as it's being downloaded
  file.write(chunk);
  //res.write(chunk);
});
rem.on('end', function() {
  //res.end();
});

//Thanks Advice
//
// the data is already accessible when it's being written to disk.
// If you use an event handler, you can write to both the HTTP response and the file stream
//without needing to pointlessly load the file to memory again.
//This also solves the problem with using pipe(),
//because pipe() will consume the data from the readable stream, and can only be done once.
//
// This also solves problems with running out of memory,
//because if you were to download a large file, 
//then it would effectively run your Node.js process out of memory
//With streams, only chunks of a file are loaded into memory at one time,
//so you don't have this problem
