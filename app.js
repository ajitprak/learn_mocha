//var app = require('express')();
exports.sanitize = function(word){
	return word.toLowerCase().replace(/-/g," ");
};

exports.tokenize = function(sentence){
    console.log("Tokenize function");
    return sentence.split(' ');
};

exports.info = function(callback){
    var https = require('https');
    var options = {
        host:'api.github.com',
        path:'/repos/ajitprak/learn_mocha',
        method:'GET',
        headers : {'User-Agent':'ajitprak'}
               
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
            console.log(error);
            callback(errror);
        });
    }).end();
};

exports.infoLang = function(infoFunc,callback){
    infoFunc(function(reply){
        callback("Language is "+reply.language);
    });
};

exports.testSpy = function(){
    console.log("Our Test Spy Function Called");
    //var arr = this.tokenize("Our Test Spy Function Called");
};