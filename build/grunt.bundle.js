var path = require('path'),
	fs = require('fs'),
	async = require('async'),
	mkdirp = require('mkdirp'),
	bundler = require('../lib/bundler')(path.join(__dirname, '..', 'components'));

module.exports = function(grunt) {

	grunt.task.registerTask('bundle', 'bundle assets', function() {
		var done = this.async();

		var bundles = [
			'pages/home.js'
		];

		async.each(bundles, function(bundle, cb) {
			var output = path.join(__dirname, '..', 'public', 'dist', bundle);

			mkdirp.sync(path.dirname(output));
			bundler
				.bundle(bundle, false, function(err, src) {
					if(err) return cb(err);

					grunt.log.writeln('File ' + output.cyan + ' created');
					cb(null);
				})
				.pipe(fs.createWriteStream(output));

		}, done);
	});

};
