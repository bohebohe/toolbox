var re = /\d+.pdf/;
var step = 10;

var get = function (pdfs, i) {
   if (i >= pdfs.length) {
       return;
   }
   var elem = pdfs[i];
   var filename;
   var xhr = new XMLHttpRequest();
   xhr.responseType = 'blob';
   xhr.onload = function (e) {
       console.log('downloaded: ', filename);
       var blob = xhr.response;

       var a = document.createElement('a');
       var url = window.URL.createObjectURL(blob);
       a.href = url;
       a.download = filename;
       a.click();
       window.URL.revokeObjectURL(url);
       get(pdfs, i + step);
   };

   filename = elem.href.match(re);
   xhr.open('GET', elem.href.slice(0, -1) + '1', true);
   xhr.send();
   console.log('downloading', filename);
};


var pdfs = document.getElementsByClassName('filename-link');

for (var i = 0; i < step; i++) {
   get(pdfs, i);
}
