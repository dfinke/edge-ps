var express = require('express')
var http    = require('http'); 
var path    = require('path'); 
var edge    = require('edge');
var app     = express();

app.use(express.static(path.join(__dirname, 'public')));

var ps=edge.func('ps', function(){/*

. .\slickgridPage.ps1

Get-Process |
	Select name, company, handles |
	ConvertTo-SlickGrid

*/})


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