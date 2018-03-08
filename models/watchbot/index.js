// requires on function from watcher
var watcher = require('./watcher');

module.exports = {

	handle: function (event, context) {
		// returns info for specific user
		return watcher.on({ user: 'jairof' }).then(function (products) {
			// Amazon lambda function - not working, may switch to different db. Possible deployment
			// issue
			context.succeed(products);
		}).catch(function (err) {
			context.fail(err);
		});
	}

};