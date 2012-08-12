var restify = require('restify'),
	assert = require('assert');

var client = restify.createJsonClient({
	url: 'http://localhost:8080/',
	version: '*'
});

client.get('/wines',  function(err, req, res, obj) {
	assert.ifError(err);
	console.log('%j', obj);
});

client.get('/wines/1',  function(err, req, res, obj) {
	assert.ifError(err);
	console.log('%j', obj);
});

client.get('/wines/search/CHATEAU',  function(err, req, res, obj) {
	assert.ifError(err);
	console.log('%j', obj);
});

client.post('/wines', {name: 'Ligia CHATEAU'}, function(err, req, res, obj) {
	assert.ifError(err);
	console.log('%j', obj);
});

client.put('/wines/1', {name: 'Thiago CHATEAU'}, function(err, req, res, obj) {
	assert.ifError(err);
	console.log('%j', obj);
});

client.del('/wines/2',  function(err, req, res, obj) {
	assert.ifError(err);
	console.log('%j', obj);
});