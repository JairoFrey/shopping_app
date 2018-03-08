// setting up promise
var Promise = require('bluebird');
// using scraper app for info from sites
var scraper = require('../scraper');
// getting list of products to update 
var repository = require('../repository/products');

module.exports = {

	on: function (event) {
		// gets list of items
		return repository.list(event.user, null).then(function (products) {
			// empty string for all changes to be pushed to
			var productUpdates = [];
			// gets info from products table
			products.forEach(function (product) {
				// make JSON info into string
				var original = JSON.stringify(product);
				// place holder for updates
				var storeUpdates = [];
				// gets info from each site from stores column, starts function to push stored updates
				// from scraper
				product.stores.forEach(function (store) {
					// pushes info gahtered from scraper
					storeUpdates.push(scraper.getPrice(store.url, store.metadata).then(function (price) {
						// initial price or price are samesies
						store.initialPrice = store.initialPrice || price;
						// store.latest price is now the price
						store.latestPrice = price;
					}).catch(function (err) {
						console.log(err);
						return err;
					}));
				});
				// push store update info to product updates for promise
				productUpdates.push(Promise.all(storeUpdates).then(function () {
					// if all info is the same then resolve promise
					if (JSON.stringify(product) === original) {
						return Promise.resolve();
					} 
					// if there is a change, run save function from products.js which pushes new info
					// to the products table
					else {
						return repository.save(product).catch(function (err) {
							console.log(err);
							return err;
						});
					}
				}));
			});
			// does this for each item in productUpdates array
			return Promise.all(productUpdates);
		});
	}

};