var bean = require('bean'),
	dotTpl = require('./dot.jade'),
	mainTpl = require('./index.jade'),
	bean = require('bean'),
	qwery = require('qwery');

module.exports = function(container) {
	var timer,
		$container = qwery(container)[0];

	$container.innerHTML = mainTpl();

	var $go = qwery('button.go', $container)[0],
		$stop = qwery('button.stop', $container)[0],
		$output = qwery('.output', $container)[0];

	function markit() {
		$output.innerHTML += dotTpl();
	}

	bean.on($go, 'click', function go() {
		if(!timer) timer = setInterval(markit, 1000);
	});

	bean.on($stop, 'click', function stop() {
		clearInterval(timer);
		timer = null;
	});

};
