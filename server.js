// server.js
// load the things we need
var express = require('express');
var http = require('http');
var app = express();

var port = process.env.PORT || 8080; // set our port

// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
	var data = "";
	http.get("http://www.kylemoses.com/api/kyle", function(res) {
		console.log("Got response: " + res.statusCode);
		if (res.statusCode == 200) {
			console.log("Got value: " + res.statusMessage);
		}
		res.on("data", function(chunk) {
			data = JSON.parse(chunk);
		});
		res.on('end', function() {
			console.log(data);
			renderfunc(data);
		})
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});

	function renderfunc(data) {
		res.render('pages/index', { data: data });
	}
});

app.use(express.static(__dirname + '/public'));

if (typeof(PhusionPassenger) != 'undefined') {
	console.log('Example app listening with passenger');
	app.listen('passenger');
} else {
	app.listen(port);
	console.log('Magic happens on port ' + port);
}
