var expect = require('expect');
var sinon = require('sinon');
var jsFile = 'SharedFlows/SF-Employee-App-Proxy-Exception-Handling/sharedflowbundle/resources/jsc/ProxyErrorHandling.js';
var contextVars = {};

//Mocha Tests here:
describe('Received valid fault name', function() {
	it('Received InvalidAccessToken fault', function() {
		contextGetVariableMethod.withArgs("fault.name").returns("InvalidAccessToken");
		loadJS();
		expect(contextVars["flow.errorStatusCode"]).toEqual('401');
		expect(contextVars["flow.errorReasonPhrase"]).toEqual('Unauthorized');
		expect(contextVars["flow.errorUserMessage"]).toEqual('Invalid Access Token');
	});

	it('Received access_token_expired fault', function() {
		contextGetVariableMethod.withArgs("fault.name").returns("access_token_expired");
		loadJS();
		expect(contextVars["flow.errorStatusCode"]).toEqual('401');
		expect(contextVars["flow.errorReasonPhrase"]).toEqual('Unauthorized');
		expect(contextVars["flow.errorUserMessage"]).toEqual('Access Token Expired');
	});

	it('Received QuotaViolation fault', function() {
		contextGetVariableMethod.withArgs("fault.name").returns("QuotaViolation");
		loadJS();
		expect(contextVars["flow.errorStatusCode"]).toEqual('429');
		expect(contextVars["flow.errorReasonPhrase"]).toEqual('Too Many Requests');
		expect(contextVars["flow.errorUserMessage"]).toEqual('Quota has been exceeded');
	});
});

//Create Apigee Context object:
GLOBAL.context = {
	getVariable: function(variable) {},
	setVariable: function(variable, value) {}
};

var contextGetVariableMethod, contextSetVariableMethod;

// This method will execute before every it() method in the test
// we are stubbing all Apigee objects and the methods we need here
beforeEach(function() {
	contextGetVariableMethod = sinon.stub(context, 'getVariable');
	contextSetVariableMethod = sinon.stub(context, 'setVariable',
		function(a, b) {
			contextVars[a] = b;
		}
	);
});

// restore all stubbed methods back to their original implementation
afterEach(function() {
	contextGetVariableMethod.restore();
	contextSetVariableMethod.restore();
});

function loadJS() {
	//ensure js can be included without error
	var errorThrown = false;
	try {
		requireUncached(jsFile);
	} catch (e) {
		console.log(e.stack);
		errorThrown = true;
	}
	expect(errorThrown).toEqual(false);
}

// node.js caches modules that is imported using 'require'
// this utility function prevents caching between it() functions - don't forget that variables are global in our javascript file
function requireUncached(module) {
	delete require.cache[require.resolve(module)];
	return require(module);
}