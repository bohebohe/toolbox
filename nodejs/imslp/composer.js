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
const filename = 'imslp_composer.csv';


function outputCsv(data, start,blloop) {
    json2csv({
        data: data
    }, function(err, csv) {
        if (err) console.log(err);
        fs.appendFileSync(filename, csv);
        start = start + 1000;
        //暫定的コメントアウト
        if(blloop){
          getData(start, filename);
        }
    });
}


function getData(start) {
    const format = 'json';
    let url = 'http://imslp.org/imslpscripts/API.ISCR.php?account';
    url += '=worklist/disclaimer=accepted/sort=id/type=1/start=';
    url += start + '/retformat=' + format;

    request({
        url: url,
        method: 'GET',
    }, function(err, res, body) {
        const data = [];
        const result = JSON.parse(body);

        let blloop = result.metadata.moreresultsavailable;
        console.log(Object.keys(result).length);
        for (var i = 0; i < Object.keys(result).length-1 ; i++) {
            (function(chunk) {
                let search = chunk.id.replace(/Category:/gi, '');
                console.log(search);
                ythandler.search(search)
                    .on('complete', function(ret) {
                        chunk.name = search;
                        chunk.ytcount = ret.pageInfo.totalResults;
                        console.log(ret);
                        data.push(chunk);
                        if (data.length === Object.keys(result).length-1) {
                            outputCsv(data, start,blloop);
                        }
                    });
            })(result[i])
        }
    });
}

getData(0);
