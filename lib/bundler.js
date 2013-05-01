var path = require('path'),
	browserify = require('browserify'),
	jadeTransform = require('./jade-transform');

module.exports = function(root) {

	var bundler = function(req, res, next) {
		var module,
			match = req.url.match(/^(.+)\.js$/);

		if(!match) return next();

		module = match[1];

		res.setHeader('Content-Type', 'text/javascript');

		bundler
			.bundle(module, true, function(err, src) {
				if(err) {
					console.error(err);
					src = err.toString();
				}

				res.send(src);
			});

	};

	bundler.bundle = function(module, debug, done) {
		return browserify()
			.add(path.join(root, module))
			// .require(path.join(root, module), { expose: '/'+module })
			.transform(jadeTransform)
			.bundle({ debug: debug }, done);
	};

	return bundler;
};
