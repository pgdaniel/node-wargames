process.title = 'node-wargames';
process.addListener('uncaughtException', function (err) {
	console.log('Caught exception: ' + err);
	console.log(err.stack.split('\n'));
});

var express = require('express');
var http = require('http');
var morgan = require('morgan');

var port = 5656;
var app = express();
var server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(morgan(':req[x-real-ip]\t:status\t:method\t:url\t'));
app.use(express.static(__dirname + '/public'));

app.get(/.*/, function(req, res) {
	res.render('layout');
});

server.listen(port, null);

var Wargames = require(__dirname + '/lib/wargames');
new Wargames(server, {
	ircNetwork: 'irc.freenode.net'
	, ircChannel: '#Node.js'
	, ircBotNick: 'MrWarGames'
	, ircUserName: 'MrWarGames'
	, ircRealName: 'MrWarGames'
	, cachePath: '/tmp/cache.json'
});
