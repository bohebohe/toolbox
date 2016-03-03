var EventEmitter = require('events').EventEmitter;
var util = require('util');

function MyProcess() {
  EventEmitter.call(this);
}

// EventTestはEventEmitterを継承する・・イベントを必要とするオブジェクトを作る際に使うイディオム
util.inherits(MyProcess, EventEmitter);

var myproc = new MyProcess();


myproc.on('count', function(c) {
  if (c > 10) {
    return;
  }
  console.log(c);
  //process nextTick
  process.nextTick(function() {
    myproc.emit('count', ++c);
  });
  //setTimeout Pattern
  setTimeout(function() {
   process.emit('count', ++c);
  }, 0);
  //setImmediate
  setImmediate(function() {
   process.emit('count', ++c);
 });
});

//process.nextTick(): I/O コールバックの前
//setImmediate() : I/O コールバックの後

myproc.emit('count', 0); // A
// 0 1 2 3 4 5 6 7 8 9 10
