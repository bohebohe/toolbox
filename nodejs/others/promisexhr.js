'use strict';

var request = require('request');
var Promise = require('promise');



function httpcall(url){
  var core = {
    ajax: function (method, url, args){
 console.log(method);
      var url2 = 'https://developer.mozilla.org/en-US/search.json?topic=js&q=promise';
      var promise = new Promise(function(resolve, reject){
        //var client = new XMLHttpRequest();
        var client = new request();
 console.log(url2);
 console.log('-------');
//         if(args && (method === 'POST' || method ==='PUT')){
//           uri += '?';
//           var argcount = 0;
//           for(var key in args){
//             if(args.hasOwnProperty(key)){
//               if(argcount++){
//                 uri += '&';
//               }
//               uri += encodeURIComponent(key)+ '=' + encodeURIComponent(args[key]);
//             }
//           }//end for
//         }//end if

        client.open(method, url2);
        client.send();

        client.ondata = function() {
          if(this.status >= 200 && this.status < 300){
            resolve(this.response);
          }else{
            reject(this.status);
          }
        };

        client.onerror = function () {
          reject(this.statusText);
        };
      }); //promise

      return promise;
    }
  };

  return {
    'get' : function(args) {
      return core.ajax('GET', url, args);
    },
    'post' : function(args) {
      return core.ajax('POST', url, args);
    }
  };

}
//End function

var callback = {
  success : function(data){
    console.log(1, 'success', JSON.parse(data));
  },
  error : function(data){
    console.log('error occured');
    console.log(data);
    console.log(2, 'error', JSON.parse(data));
  }
};


const mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
const payload = {
  'topic':'js',
  'q':'Promise'
};

httpcall(mdnAPI)
.get(payload)
.then(callback.success)
.catch(callback.error);
