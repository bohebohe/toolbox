'use strict';

const HandleYoutube = require('./youtube.js');
const lineReader = require('line-reader');

const config = {
    part: 'id',
    regionCode: 'JP',
    order: 'viewCount'
};
const ythandler = new HandleYoutube(config);

lineReader.eachLine('composer_test_data.csv', function(composer, last) {
    ythandler.search(composer, function(data) {
        console.log(composer + '::' + data.pageInfo.totalResults);
    });
});
