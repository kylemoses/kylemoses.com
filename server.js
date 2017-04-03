// server.js
// load the things we need
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var email = require('emailjs');
var fs = require('fs')

var app = express();
// set our port
var port = process.env.PORT || 8080;
// set the view engine to ejs
app.set('view engine', 'ejs');
// use things
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// load api data
var kyleData = "";
http.get("http://www.kylemoses.com/api/kyle", function(res) {
	console.log("Got response: " + res.statusCode);
	if (res.statusCode == 200) {
		console.log("Got value: " + res.statusMessage);
	}
	res.on("data", function(chunk) {
		kyleData = JSON.parse(chunk);
	});
	res.on('end', function() {
		console.log(kyleData);
	})
}).on('error', function(e) {
	console.log("Got error: " + e.message);
});
// read password from file rather than storing directly in javascript
var appPass = "";
fs.readFile(__dirname + "/" + "app-specific-password.txt", 'utf8', function(err, data) {
	appPass = data
	console.log('appPass: ', appPass);
});

// index page 
app.get('/', function(req, res) {
	res.render('pages/index', { data: kyleData });
});

// contact Page
app.get('/contact', function(req, res) {
	res.render('pages/contact', { data: kyleData })
});

app.post('/contact', function(req, res) {
	var formData = "";
	// get the data from the post request
	formData = req.body;
	// setup the smtp server
	var emailServer = email.server.connect({
		user: "moses.kyle@gmail.com",
		password: appPass,
		host: "smtp.gmail.com",
		ssl: true
	});
	// Compile the message body
	emailMessage = "";
	emailMessage += 'From: ' + formData.name + '\r\n';
	emailMessage += 'Email: ' + formData.email + '\r\n';
	emailMessage += 'Subject: ' + formData.subject + '\r\n';
	emailMessage += 'Message: ' + formData.message + '\r\n';
	// send the message and get a callback with an error or details of the message that was sent
	emailServer.send({
		text: emailMessage,
		from: formData.email,
		to: "moses.kyle@gmail.com",
		cc: "",
		subject: 'A message from your website!: ' + formData.subject
	}, function(err, message) {
		if (err) {
			console.log(err);
			res.status(500).send("There was a problem!");
		} else {
			console.log(message);
			res.status(200).send("message sent!");
		}
	});
});

if (typeof(PhusionPassenger) != 'undefined') {
	console.log('Example app listening with passenger');
	app.listen('passenger');
} else {
	app.listen(port);
	console.log('Magic happens on port ' + port);
}
