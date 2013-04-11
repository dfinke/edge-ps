var edge = require('edge')
var express = require('express');
var app = express();

var gwmi = edge.func('ps', function() {/*
    Get-WmiObject -ClassName $inputFromJS | 
    	ConvertTo-Html -As List
*/});

app.get('/ps/wmi/:class', function(req, res) {
	gwmi(req.params.class, function (error, result) {
		if (error) throw error;
  		
  		res.setHeader('Content-Type', 'text/html');
  		res.end(result.join(' '));
	});
});

var eventlog = edge.func('ps', function() {/*
	Get-EventLog -LogName Application -Newest 100 | 
		ConvertTo-Html -As List
*/});

app.get('/ps/eventlog', function(req, res) {
	eventlog(null, function (error, result) {
		if (error) throw error;
  		
  		res.setHeader('Content-Type', 'text/html');
  		res.end(result.join(' '));
	});
});

console.log('try http://localhost:8080/ps/wmi/win32_bios');
console.log('try http://localhost:8080/ps/eventlog');

app.listen(8080);