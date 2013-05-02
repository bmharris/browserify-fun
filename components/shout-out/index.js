var tpl = require('./index.jade'),
	shout = require('./shout.jade'),
	$ = require('../ender');

module.exports = function(container) {

	var $container = $(container).html(tpl()),
		$output = $container.find('.output');

	$container.find('button').on('click', function() {
		$output.html(shout());
	});
};
