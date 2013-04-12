var edge = require('edge')
var express = require('express');
var app = express();

var eventlog = edge.func('ps', function() {/*
	Get-EventLog -LogName Application -Newest $inputFromJS | 
		ConvertTo-Json
*/});

app.get('/ps/eventlog/:totalItems', function(req, res) {

	var totalItems = req.params.totalItems || 100;

	eventlog(totalItems, function (error, result) {
		if (error) throw error;
  		
  		res.send(result[0]);
	});
});

console.log('try http://localhost:8080/ps/eventlog');
app.listen(8080);