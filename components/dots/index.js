var emojis = require('./emojis'),
	dotTpl = require('./dot.jade'),
	mainTpl = require('./index.jade'),
	$ = require('../ender');

module.exports = function(container) {
	var timer,
		$container = $(container);

	$container.html(mainTpl());

	var $output = $container.find('.output');

	function markit() {
		$output.append(dotTpl({ emoji: emojis[Math.floor(Math.random()*emojis.length)] }));
	}

	$container.find('button.go').on('click', function go() {
		if(!timer) timer = setInterval(markit, 1000);
	});

	$container.find('button.stop').on('click', function stop() {
		clearInterval(timer);
		timer = null;
	});

};
