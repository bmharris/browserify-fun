var through = require('through'),
	jade = require('jade');

module.exports = function (file) {
	if (!/\.jade$/.test(file)) return through();

	var buffer = '',
		stream = through(
			function(str) {
				buffer += str;
			},
			function() {
				this.queue(transform(buffer, file));
				this.queue(null);
			}
		);

	return stream;
};

function transform(str, file) {
	var template = jade.compile(str, { client: true, filename: file, compileDebug: false });

	return [
		'require("jade/runtime.js");', //ensure client-side runtime is included in bundle
		'module.exports=', template.toString()
	].join('');
}










// function transform(str, file) {
// 	var template = jade.compile(str, { client: true, filename: file, compileDebug: false });

// 	return [
// 		'require("jade/runtime.js");', //ensure client-side runtime is included in bundle
// 		'var tpl = ', template.toString(),';',
// 		'var moment = require("moment");',
// 		'module.exports=function(params) {',
// 			'params = params||{};',
// 			'params.moment = moment;',
// 			'return tpl(params);',
// 		'};'
// 	].join('');
// }
