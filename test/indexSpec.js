var chai = require('chai');
var expect = chai.expect;
var app = require('../app');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

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

/*describe('Git Info',function(){
	it('Returns info from github',function(done){
		app.info(function(data){
			//console.log(data);
			expect(data.language).to.equal('JavaScript');
			expect(data.default_branch).to.equal('master');
			done();
		});
	});
});*/

describe('Git Info lang',function(){
	it('Returns the language from github',function(done){
		var giHub = {
			language:"Assembly"
		};
		var stub = sinon.stub().callsArgWith(0,giHub);
		app.infoLang(stub,function(reply){
                    expect(reply).to.equal("Language is Assembly");
                    done();
		});
	});
});