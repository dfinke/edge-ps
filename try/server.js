var edge = require('edge')
var express = require('express');
var app = express();

var invokePS = edge.func('ps', function() {/*
    Get-WmiObject -ClassName $inputFromJS | 
    	ConvertTo-Html -As List
*/});

app.get('/ps/wmi/:class', function(req, res) {
	invokePS(req.params.class, function (error, result) {
		if (error) throw error;
		res.send(result.toString());
	});
});

console.log('try http://localhost:8080/ps/wmi/win32_bios');
app.listen(8080);