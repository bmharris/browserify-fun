var tpl = require('./index.jade'),
	qs = require('querystring'),
	url = require('url'),
	$ = require('../ender');

module.exports = function(container) {

	var $container = $(container).html(tpl());

	var $input = $container.find('input'),
		$output = $container.find('.output');

	$container.find('button').on('click', function() {
		var parsed = url.parse($input.val());

		$output.html(JSON.stringify(parsed, null, '\t'));
		$output.append('\n'+JSON.stringify(qs.parse(parsed.query)));
	});
};
