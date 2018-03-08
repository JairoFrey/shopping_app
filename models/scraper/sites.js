// calling sites that are going to be scraped
var url = require('url');
var amazon = require('./amazon');
var target = require('./target');

module.exports = {

	getScraper: function(uri) {
		// takes a URL string and parses it then returns URL object
		var domain = url.parse(uri).hostname;
		// will do parsing for each site we ad for price monitoring
		switch(domain) {
			case 'www.amazon.com': return amazon;
			case 'www.target.com': return target;
			default: throw new Error('Unsupported domain: ' + domain);
		}
	}

};