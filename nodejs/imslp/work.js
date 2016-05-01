'use strict';

const request = require('ajax-request');
const json2csv = require('json2csv');
const fs = require('fs');

function getData(start) {

    const format = 'json';
    let url = 'http://imslp.org/imslpscripts/API.ISCR.php?account';
    url += '=worklist/disclaimer=accepted/sort=id/type=2/start=';
    url += start + '/retformat=' + format;

    const filename = 'imslp_works.csv';

    request({
        url: url,
        method: 'GET',
    }, function(err, res, body) {
        const data = [];
        const obj = JSON.parse(body);

        let blloop = obj.metadata.moreresultsavailable;
        for (var i = 0; i < 1000; i++) {
            obj[i][id];
            data.push(obj[i]);
        }
        //console.log(data);

        //fields = ['id','type','parent','permlink'];
        //json2csv({ data: data, fields: fields }, function(err, csv) {
        json2csv({
            data: data
        }, function(err, csv) {
            if (err) console.log(err);
            console.log(start);
            fs.appendFileSync(filename, csv);
            start = start + 1000;

            if (blloop) {
                getData(start, filename);
            }
        });
    });
}

getData(0);
