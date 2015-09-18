var chai = require('chai');
var expect = chai.expect;
var app = require('../app');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var iService = require('../iService');
var defaultApiManager = require('../defaultApiManager');

chai.use(sinonChai);
var sandbox;
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

describe("Spy testing tokenize",function(){
    beforeEach(function(){
        sandbox = sinon.sandbox.create();
        sandbox.spy = sinon.spy(app,"tokenize");
        app.testSpy(sandbox.spy);
    });
    it('Check if tokenize is called',function(){
        expect(sandbox.spy.called).to.equal(true);
    });
    it("Checks if the function is called with proper argument",function(){
        expect(sandbox.spy.calledWith("Our Test Spy Function Called")).to.equal(true);
    });
    afterEach(function(){
        app.tokenize.restore();
        sandbox.restore();
    });
});

describe("Spy testinf testSpy",function(){
    beforeEach(function(){
        sandbox = sinon.sandbox.create();
        sandbox.spy = sinon.spy(app,"testSpy");
        app.testSpy("ABCD","IJKL",sandbox.spy);
        app.testSpy("XYZ",sandbox.spy);
    });
    it('Check if testSpy is called and called Twice',function(){
        expect(sandbox.spy.called).to.equal(true);
        expect(sandbox.spy.calledOnce).to.equal(false);
        expect(sandbox.spy.callCount).to.equal(2);
    });
    it("Check if the testSpy function is called with proper argument",function(){
        expect(sandbox.spy.calledWith("ABCD")).to.equal(true);
        expect(sandbox.spy.getCall(0).args[0]).to.equal("ABCD");
        expect(sandbox.spy.getCall(1).args[0]).to.equal("XYZ"); // Checks the argument of the second ca;;
        expect(sandbox.spy.getCall(0).args[1]).to.equal("IJKL"); //Checks the second argument of the first call
        expect(sandbox.spy.calledWith("ABCD","IJKL")).to.equal(true); // Prefered way of checking the arguments.
    });
    it("Checks if testspy returns proper value",function(){
        expect(sandbox.spy.returned("ABCD")).to.equal(true);
    });
    afterEach(function(){
        app.testSpy.restore();
        sandbox.restore();
    });
});

describe("Original App flow Testing",function(){
    it.only("Test whether mock iService is called",function(done){
        var iServiceStub = sinon.stub(iService,"dbCall",function(){
            console.log("STUBBED iService is called");
            done();
        });
        defaultApiManager.handler("Query");
        iServiceStub.restore();
    });
});