var file = process.argv[2];

var fs = require('fs');
var buf = fs.readFileSync(file);
var str = buf.toString("utf8");
//console.log(str);
var ary = str.split("\n");
console.log(ary.length - 1);

//非同期
// fs.readFile('./test.txt', function (err, buf) {
//   if (err) throw err;
//   var str = buf.toString();
//   var ary = str.split("\n");
//   console.log(ary.length -1 );
// });
