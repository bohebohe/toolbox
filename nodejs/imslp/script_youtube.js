'use strict';

var google = require('googleapis');
var util = require('util');

const serverKey = 'API_KEYS';
// initialize the Youtube API library
var youtube = google.youtube({
    version: 'v3',
    auth: serverKey
});

// a very simple example of searching for youtube videos
function runSearch() {
    youtube.search.list({
        part: 'id',
        q: 'Beethoven, Ludwig van',
        regionCode: 'JP',
        order: 'viewCount'
    }, function(err, data) {
        if (err) {
            console.error('Error: ' + err);
        }
        if (data) {
            console.log(util.inspect(data, false, null));
        }
        process.exit();
    });
}

runSearch();

// var scopes = [
//   'https://www.googleapis.com/auth/youtube'
// ];
//
// sampleClient.execute(scopes, runSamples);
