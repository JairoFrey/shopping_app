// calls list of sites to scrape
var sites = require('./sites');

module.exports = {
	
	getPrice: function(url, metadata) {
		// returns scraped data for each site
		return sites.getScraper(url).getPrice(url, metadata);
	}
	
};