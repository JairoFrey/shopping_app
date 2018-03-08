// bluebird module allow promises
var Promise = require('bluebird');
// used to create scraper
var request = require('request');
var cheerio = require('cheerio');

module.exports = {

	getContent: function (url) {
		// promise used to run function every
		return new Promise(function (resolve, reject) {
			if (!url) {
				return reject(new Error('URL should be provided'));
			}
			// sets the url for scraper to run on
			var options = {
				url: url,
				headers: { 'User-Agent': 'Price Tracker Bot' },
				timeout: 60000
			};
			// runs bot for given URL
			request(options, function (error, response, body) {
				// the there is no error, resolves the promise with scraped info
				if (!error && response.statusCode === 200) {
					resolve(cheerio.load(body));
				} else {
					error = error || 'Unexpected status code ' + response.statusCode;
					reject(new Error(url + '. ' + error));
				}
			});
		});
	}

};