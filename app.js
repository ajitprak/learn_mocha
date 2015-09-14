//var app = require('express')();
exports.sanitize = function(word){
	return word.toLowerCase().replace(/-/g," ");
};