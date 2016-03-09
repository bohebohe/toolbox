var KEEPALIVE_INTERVAL = 60000;
var KEEPALIVE_MAX = 30;

var webSocket;

var url = window.location;
var ws_url = url.protocol === 'https:' ? 'wss:' : 'ws:' + '//' + url.host;
 console.log('WebSocket Host: ' + ws_url);

 webSocket = new WebSocket(ws_url);
 webSocket.onopen = function() {
   webSocket.send(JSON.stringify({
     "type": "success_connection",
     "data": "none"
   }));
 };

 webSocket.onmessage = function(e) {
   var message = JSON.parse(e.data);
   max_keepalive = KEEPALIVE_MAX;

   switch (message.type) {
     case 'success_connection':
       console.log('success_connection');
       break;
     case 'strings':
       showText(message.value.note);
       break;
     default:
       console.log('Unknown message type: ', e.data);
   }
 };

 setTimeout(function keepalive() {
   if (max_keepalive-- > 0) {
     webSocket.send(JSON.stringify({
       type: 'iamalive',
       value: 0
     }));
     setTimeout(keepalive, KEEPALIVE_INTERVAL);
   }
 }, KEEPALIVE_INTERVAL);


function showText(msg){
  var text = document.getElementById('text');
  text.innerHTML = msg;
}

// event operation
function clickStrings() {
  var note_val = 'We Love Strings';
  showText(note_val);
  webSocket.send(JSON.stringify({
   type: 'strings',
   value: {
     note: note_val
   }
 }));
 return false;
}

function clickBrass() {
  var note_val = 'We Love Brass';
  showText(note_val);
  webSocket.send(JSON.stringify({
   type: 'strings',
   value: {
     note: note_val
   }
 }));
 return false;
}

function clickPercussion() {
  var note_val = 'We Love Percussion';
  showText(note_val);
  webSocket.send(JSON.stringify({
   type: 'strings',
   value: {
     note: note_val
   }
 }));
 return false;
}
