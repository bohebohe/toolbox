var myReadDir = require("./mymodule.js");
var dir = process.argv[2];
var extension =process.argv[3];
//debugger;
myReadDir(dir, extension,function(err,info){
    //console.log(info);
    info.forEach(function (item, index, array) {
      console.log(item);
    });
});
