var chai = require('chai');
var expect = chai.expect;
var app = require('../app');

describe('sanitize input',function(){
	it('returns lowercase of given input',function(){
		var inputWord = "HELLO WORLD";
		var outputWord = app.sanitize(inputWord);
		
		expect(outputWord).to.equal("hello world");
		expect(outputWord).to.not.equal("HELLO WORLD");
		expect(outputWord).to.be.a('string');
		expect(outputWord).to.not.be.a('number');
		expect(outputWord).to.contain('hello');
	});
	it('removes hyphen',function(){
		var inputWord = "HELLO WORLD";
		var outputWord = app.sanitize(inputWord);
		
		expect(outputWord).to.equal('hello world')
	});
});

describe('Tokenize',function(){
    it('Returns Tokenized sentance',function(){
            var sentence = "Lets say Hello World";
            var sentanceArray = app.tokenize(sentence);
            expect(sentanceArray).to.be.a('array');
            expect(sentanceArray).to.include.members(["Lets","say","Hello","World"]);
        });
});