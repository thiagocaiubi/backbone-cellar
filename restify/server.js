// require restify and bodyParser to read Backbone.js syncs
var restify = require('restify');  
var server = restify.createServer(),
	_ = require('underscore')._,
	Backbone = require('backbone');

var Wine = Backbone.Model.extend({

    urlRoot: "api/wines",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.grapes = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a grape variety"};
        };

        this.validators.country = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a country"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        id: null,
        name: "",
        grapes: "",
        country: "USA",
        region: "California",
        year: "",
        description: "",
        picture: null
    }
});

var WineCollection = Backbone.Collection.extend({
    model: Wine,
    url: "api/wines"
});

server.use(restify.bodyParser());

function getWines(req, res, next) {
	var w = new Wine(),
		list = new WineCollection();

	list.add(w);
	
	res.send(list);
	return next();
}

function getWine(req, res, next) {
	console.log('getWine');
	res.send('getWine');
	return next();
}

function findByName(req, res, next) {
	console.log('findByName');
	res.send('findByName');
	return next();
}

function addWine(req, res, next) {
	console.log('addWine');
	res.send('addWine');
	return next();
}

function updateWine(req, res, next) {
	console.log('updateWine');
	res.send('updateWine');
	return  next();
}

function deleteWine(req, res, next) {
	console.log('deleteWine');
	res.send('deleteWine');
	return next();
}

server.get('/wines', getWines);
server.get('/wines/:id', getWine);
server.get('/wines/search/:query', findByName);
server.post('/wines', addWine);
server.put('/wines/:id', updateWine);
server.del('/wines/:id', deleteWine);

server.listen(8080, function() {
	console.log('%s listening at %s, love & peace', server.name, server.url);
});