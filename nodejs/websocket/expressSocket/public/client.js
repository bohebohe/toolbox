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
       play(message.value.note);
       break;
     case 'brass':
       breath(message.value.rest);
       break;
     case 'percussion':
      beat(message.value.rhythm);
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



 function play(note_val){
   var text = document.getElementById('text');
    text.innerHTML = 'We Love Strings';
    webSocket.send(JSON.stringify({
     type: 'strings',
     value: {
       note: note_val
     }
   }));
 }
 function breath(rest_val){
   var text = document.getElementById('text');
    text.innerHTML = 'We Love Brass';
    webSocket.send(JSON.stringify({
     type: 'brass',
     value: {
       rest:rest_val
     }
   }));
 }
 function beat(rhythm_val){
   var text = document.getElementById('text');
    text.innerHTML = 'We Love percussion';
    webSocket.send(JSON.stringify({
     type: 'percussion',
     value: {
       rhythm:rhythm_val
     }
   }));
 }
// event operation
function clickStrings() {
  console.log("clickStrings");
  return play('c d e f g a h c');
}

function clickBrass() {
  return breath('a b c d e f g ');
}

function clickPercussion() {
  return beat('123 456 789');
}
