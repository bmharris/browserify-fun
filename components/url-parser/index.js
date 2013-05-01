var tpl = require('./index.jade'),
	qs = require('querystring'),
	url = require('url'),
	bean = require('bean'),
	qwery = require('qwery');

module.exports = function(container) {

	qwery(container)[0].innerHTML = tpl();

	var $input = qwery('input', container)[0],
		$output = qwery('.output', container)[0],
		$button = qwery('button', container)[0];

	bean.on($button, 'click', function() {
		var parsed = url.parse($input.value);

		$output.innerHTML = JSON.stringify(parsed, null, '\t');
		$output.innerHTML += '\n'+JSON.stringify(qs.parse(parsed.query));
	});
};
