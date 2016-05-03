'use strict';

var google = require('googleapis');
var util = require('util');
const EventEmitter = require('events');

var credential = require('/Users/bohebohechan/.google/credential');

function HandleYoutube(config) {
    this.youtube = google.youtube({
        version: 'v3',
        auth: credential.youtube
    });

    if (config) {
        this.part = config.part;
        this.regionCode = config.regionCode;
        this.order = config.order;
    }
}

HandleYoutube.prototype.search = function(query) {

    const ev = new EventEmitter();
    this.youtube.search.list({
        part: this.part,
        q: query,
        regionCode: this.regionCode,
        order: this.order
    }, function(err, data) {
        if (err) {
            console.log(err);
            ev.emit('err', err);
            //callback(err);
        }
        if (data) {
            console.log(util.inspect(data, false, null));
            //callback(data);
            ev.emit('complete', data);
        }
        //process.exit();
    });
    return ev;
};

module.exports = HandleYoutube;

//https://github.com/google/google-api-nodejs-client/blob/master/samples/youtube/search.js
