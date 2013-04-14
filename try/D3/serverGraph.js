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

        <style>

            div.chart{
                font-family:sans-serif;
                font-size:0.7em;
            }

            div.bar {
                background-color:DarkRed;
                color:white;
                height:3em;
                line-height:3em;
                padding-right:1em;
                margin-bottom:2px;
                text-align:right;
                margin-left:22em;
            }

            div.label {
                height:3em;
                line-height:3em;
                padding-right:1em;
                margin-bottom:2px;
                float:left;
                width:20em;
                text-align:right;
            }            
        </style>

        <h2>Top 10 Process with most handles</h2>
    </head>

    <body>
        
        <script type="text/javascript">

            var dataset = $dataset;
      
            d3.select("body")
            .append("div")
              .attr("class","chart")
            .selectAll(".bar")
            .data(dataset)
            .enter()
            .append("div")
              .attr("class","bar")
              .style("width", function(d){return d.Handles/10 + "px"})              
              .text(function(d){return d.Name + ': ' + d.Handles});
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