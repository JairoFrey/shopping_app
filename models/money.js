// sets denomination

module.exports = function (value) {
	// if value is false, return null
	if (!value) return null;
	// if value $ function is different throw err
	if (value.indexOf('$') === -1) throw new Error('At the moment USD is the only supported currency');
	// replace price and show USD
	return {
		amount: Number(value.replace('$', '')),
		currency: 'USD'
	};

};