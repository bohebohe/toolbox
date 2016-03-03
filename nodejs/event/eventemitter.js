var EventEmitter = require('events').EventEmitter;
var util = require('util');

function EventTest() {
  // see http://d.hatena.ne.jp/Jxck/20110621/1308616949
  //EventTest() から生成したオブジェクトは EventTest を this として EventEmitter のコンストラクタを実行して各初期化を行い、
  //events.EventEmitter がプロトタイプチェーンにあるから、メソッドやプロパティが参照できる。
//つまり EventTest() は EventEmitter を継承させたということでした。
  EventEmitter.call(this);
}

// EventTestはEventEmitterを継承する・・イベントを必要とするオブジェクトを作る際に使うイディオム
util.inherits(EventTest, EventEmitter);

EventTest.prototype.log = function(data) {
  console.log(data);
}

var etest = new EventTest();


// onでイベント受信
etest.on("test", etest.log);

// onceだと一回だけイベント受信
etest.once("test_once", etest.log);

// ----------- emitでイベント発行
etest.emit("test", "Hello EventEmitter");

// removeListenerでイベントを消すことができる
etest.removeListener("test", etest.log);

// -------------- 削除されているとemitしてもイベントを受け取れない
etest.emit("test", "Hello EventEmitter");

// -------------- onceに対してemitする。
etest.emit("test_once", "Hello EventEmitter Once");

// --------------- onceだと2回emitしても受信されない。
etest.emit("test_once", "This message is not shown.");
