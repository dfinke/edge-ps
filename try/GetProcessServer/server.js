var express = require('express')
var http    = require('http'); 
var path    = require('path'); 
var edge    = require('edge');
var app     = express();

var ps=edge.func('ps', function(){/*
    
Import-Module .\psjsConversions.psm1

Get-Process |
    Select name, company, handles | 
    ConvertTo-HtmlPlus

*/})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    
    ps('', function(err, result){
        
        if(err) throw err;
        res.send(200, result[0]);
    });   
});

var port = 3000;
http.createServer(app).listen(port, function(){
  console.log('point your browser here: http://localhost:' + port);
});
