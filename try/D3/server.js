var express = require('express')
var http    = require('http'); 
var path    = require('path'); 
var edge    = require('edge');
var app     = express();
var port    = 3000;

var ps=edge.func('ps', function(){/*

$dataset = Get-Process |
			Sort handles -desc|
            Select -first 10 name, company, handles |			
			ConvertTo-Json -Compress

@"
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Top 10 Process with most handles</title>
        <script type="text/javascript" src="js/d3.v3.js"></script>
    </head>
    <body>
        <script type="text/javascript">
        	
        	var dataset = $dataset

			d3.select("body").selectAll("li")
			    .data(dataset)
			    .enter()
			    .append("li")
			    .text(function(d){
			    	return d.Name + ': ' + d.Handles;
			    });
        </script>
    </body>
</html>
"@

*/})

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    
    ps('', function(err, result){
        
        if(err) throw err;
        res.send(200, result[0]);
    });   
});

http.createServer(app).listen(port, function(){
  console.log('point your browser here: http://localhost:' + port);
});