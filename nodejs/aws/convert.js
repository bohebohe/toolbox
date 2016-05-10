'use strict';
var im = require('imagemagick');

module.exports = function (filename, callback) {
	// const pre = ['-density', '400x400'];
	// const post = ['-geometry', '1600x1600', '-quality', '60', '-sharpen', '0x1.0', '-format', 'jpeg'];
  const pre = ['-verbose', '-density', '400x400', '-type', 'GrayScale'];
  const post = ['-scale', '1600x1600', '-quality', '80', '-format', 'jpeg'];

	var outfile;
	var command;

	var dot = filename.lastIndexOf('.');
	if (dot > -1) {
		outfile = filename.slice(0, dot);
	} else {
		outfile = filename;
	}
	outfile += '.jpg';

	command = pre.concat([filename], post, [outfile]);
	console.log(command);

	im.convert(command, callback);
};
