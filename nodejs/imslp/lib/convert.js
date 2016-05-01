'use strict';

const Converter = require("csvtojson").Converter;
const converter = new Converter({});

//read from file
require("fs").createReadStream('../imslp_composer.csv').pipe(converter);

converter.on('end_parsed', function(data) {
    for (var i = 0; i < data.length; i++) {
        id = data[i].id;
        resid = id.replace(/Category:/gi, '');
        console.log(resid);
    }
});
