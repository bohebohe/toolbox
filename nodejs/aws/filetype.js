'use strict'

const readChunk = require('read-chunk'); // npm install read-chunk
const fileType = require('file-type');
const fs = require('fs');

module.exports = function(file, callback) {

    //const path = './IMSLP334901/IMSLP334901.pdf';
    //const path = './IMSLP28594/IMSLP28594.pdf';

    fs.stat(file, function(err, stats) {
        console.log(stats);
        const buffer = readChunk.sync(file, 0, stats.size);
        console.log(fileType(buffer));

        callback(fileType(buffer));

        //=> { ext: 'pdf', mime: 'application/pdf' }
    });

};
