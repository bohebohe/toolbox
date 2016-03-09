var bl = require('bl');
var http = require('http');

var url = process.argv[2];

var req = http.get(url, function(response) {
  response.pipe(bl(function (err, data) {
        if (err)
            return console.error(err);
        data = data.toString();
        console.log(data.length);
        console.log(data);
    }));
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();
