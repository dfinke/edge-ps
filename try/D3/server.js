var express = require('express')
var http    = require('http'); 
var path    = require('path'); 
var edge    = require('edge');
var app     = express();

var ps=edge.func('ps', function(){/*

$dataset = get-process |
			sort handles -desc|
			select -first 10 name,handles |
			ConvertTo-Json -Compress

@"
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>D3 Page Template</title>
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

var port = 3000;
http.createServer(app).listen(port, function(){
  console.log('point your browser here: http://localhost:' + port);
});