'use strict';

const request = require('ajax-request');
const json2csv = require('json2csv');
const fs = require('fs');
const HandleYoutube = require('./lib/youtube.js');

const config = {
    part: 'id',
    regionCode: 'JP',
    order: 'viewCount'
};
const ythandler = new HandleYoutube(config);


function getData(start) {

    const format = 'json';
    let url = 'http://imslp.org/imslpscripts/API.ISCR.php?account';
    url += '=worklist/disclaimer=accepted/sort=id/type=1/start=';
    url += start + '/retformat=' + format;

    const filename = 'imslp_composer.csv';

    request({
        url: url,
        method: 'GET',
    }, function(err, res, body) {
        const data = [];
        const result = JSON.parse(body);

        let blloop = result.metadata.moreresultsavailable;
        for (var i = 0; i < 1000; i++) {
            (function(chunk) {
                ythandler.search(chunk.id, function(ret) {
                    chunk.ytcount = ret.pageInfo.totalResults;
                    //console.log(chunk);
                    data.push(chunk);
                });
            })(result[i])

        }
        console.log(data);

        json2csv({
            data: data
        }, function(err, csv) {
            if (err) console.log(err);
            console.log(start);
            fs.appendFileSync(filename, csv);
            start = start + 1000;
            //暫定的コメントアウト
            // if(blloop){
            //   getData(start, filename);
            // }
        });
    });
}

getData(0);
