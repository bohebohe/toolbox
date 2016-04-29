// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');

const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImp0aSI6IjRmMWcyM2ExMmFhIn0.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLmNvbSIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUub3JnIiwianRpIjoiNGYxZzIzYTEyYWEiLCJpYXQiOjE0NjEwMzQwMDEsIm5iZiI6MTQ2MTAzNDA2MSwiZXhwIjoxNDYxMDM3NjAxLCJ1aWQiOjF9.XACdWpE2qeoIZP2ZX4ZmgTtP0xvJhMtxoP_crhf07RI';

// verify a token symmetric
jwt.verify(token, 'testing', { algorithms: ['HS256'] }, function(err, decoded) {
      console.log(decoded) 
});

