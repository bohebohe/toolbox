'use strict';

const test = { id: 1,
    title: 'Abschiedsgesang an Wiens BürgerFarewell Song at Vienna\'s Citizens',
    composer: 'Beethoven, Ludwig van',
    publisher: 'Classical',
    movements_sections: '1',
    opus_catalogue_number: 'WoO 121',
    music_key: 'G major',
    average_duration: null,
    copyright_information: null };

let res ={};
res.id=test.id;
res.composer=test.composer;
res.publisher=test.publisher;

var details = [
  {title: '楽章', value: test.movements_sections},
  {title: '作品番号', value: test.opus_catalogue_number},
  {title: '調', value: test.music_key},
];
res.scoreItemList = details;



console.log(res);
