const request = require('ajax-request');
const json2csv = require('json2csv');
const fs = require('fs');



getData(0, 'file0.csv');


function getData(start, filename){

    const format = 'json';
    const url ='http://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=id/type=2/start=' + start+ '/retformat='+ format

    request({
        url: url,
        method: 'GET',
    }, function(err, res, body) {
        const data =[];
        const obj = JSON.parse(body);

        for (var i = 0; i < 1000; i++) {
            data.push(obj[i]);
        }   
        //console.log(data);

        //fields = ['id','type','parent','permlink'];
        //json2csv({ data: data, fields: fields }, function(err, csv) {
        json2csv({ data: data }, function(err, csv) {
        if (err) console.log(err);
            console.log(start);
            console.log(filename);
            fs.writeFileSync(filename , csv);
            start = start+1000;
            filename = 'file'+ start + '.csv';
            getData(start, filename);
        });
    });
}

