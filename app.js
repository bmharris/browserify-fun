var format = require('util').format,
	jade = require('jade'),
	express = require('express'),
	bundler = require('./lib/bundler'),
	app = express();

app.set('view engine', 'jade');
app.set('views', __dirname+'/components');

app.use(function(req, res, next) {
	console.log(format('%s: %s', req.method, req.url));
	next();
});
app.use(express.static(__dirname+'/public'));

// dynamic bundler for development
app.use('/dyn/bundle', bundler(__dirname+'/components'));

app.get('/', function(req, res) {

	res.render('pages/home');
});

app.listen(3000, function(err) {
	if(err) return console.error(err);

	console.log('servin it up');
});
