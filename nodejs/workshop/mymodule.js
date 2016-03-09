module.exports = function myReadDir(dir, extension, callback) {
  var fs = require('fs');
  // var dir = process.argv[2];
  // var extension =process.argv[3];
  fs.readdir(dir, function(err,info){
    if (err)
      return callback(err, null);
    //console.log(info);
    var files=[];
    for(var i=0; i < info.length; i++){
        var name = info[i].split(".");
        //console.log(name);
        if(name[1] === extension){
          //console.log(info[i]);
          files.push(info[i]);

        }
    }
    return callback(null, files);
  });
};
