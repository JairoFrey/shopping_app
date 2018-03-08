// var Promise = require('bluebird');
var page = require('./page');
var money = require('./money');

module.exports = {

	getPrice: function(url, metadata) {
		// returns content from given URL's
		return page.getContent(url).then(function($) {
			// makes div W/ class of olpOfferPrice and makes if first in list
			var price = $('.olpOfferPrice').first().text();
			return money(price);
		});
	}

};