var iService = require('./iService.js');
var defaultApiManager = {};

defaultApiManager.handler = function(query){
    var params = "params";
    queryWithParams = query+params;
    var data = iService.dbCall(queryWithParams);
    return data;
};

module.exports = defaultApiManager;

