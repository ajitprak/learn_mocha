//var app = require('express')();
exports.sanitize = function(word){
	return word.toLowerCase().replace(/-/g," ");
};

exports.tokenize = function(sentence){
    return sentence.split(' ');
};

exports.info = function(callback){
    var https = require('https');
    var options = {
        url:'api.github.com',
        path:'/repos/sayanee/build-podcast',
        method:'GET',
        headers : {'User-Agent':'saynee'}
               
    };
    var str = '';
    https.request(options,function(response){
        response.on('data',function(data){
            str += data; 
        });
        response.on('end',function(){
            callback(JSON.parse(str));
        });
        response.on('error',function(error){
            callback(errror);
        });
    });
};