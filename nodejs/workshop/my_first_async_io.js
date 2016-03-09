var fs = require('fs');
var file = process.argv[2];

//非同期
fs.readFile(file, function (err, buf) {
  if (err) throw err;
  var str = buf.toString("utf8");
  var ary = str.split("\n");
  console.log(ary.length -1 );
});
