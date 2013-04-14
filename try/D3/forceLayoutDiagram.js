var express = require('express')
var http    = require('http'); 
var path    = require('path'); 
var edge    = require('edge');
var app     = express();
var port    = 3000;

var ps=edge.func('ps', function(){/*

filter ConvertTo-Link {
    param($sourceName, $targetName)

    $_ | Select @{n='source';e={$_.$sourceName}}, @{n='target';e={$_.$targetName}} 
}

$links = Get-Process | 
    Where company | 
    ConvertTo-Link Company Name | 
    ConvertTo-Json -Compress

#$links = Get-Service |       
#    ConvertTo-Link Status DisplayName |
#    ConvertTo-Json -Compress

#$links = Get-Service net*p*,*power*,*ss | 
#    Where DependentServices | ForEach {
#        $parentName = $_.Name 
#        $_.DependentServices |  % {
#            [PSCustomObject]@{
#                Source = $parentName
#                Target = $_.Name
#            }
#        }
#    } | ConvertTo-Json -Compress

@"
<html lang="en">
    <head>
        <meta charset="utf-8">
        <script type="text/javascript" src="js/d3.v3.js"></script>
        <style>
            path.link {
                fill: none;
                stroke: #666;
                stroke-width: 1.5px; 
            }

            circle {
                fill: #ccc;
                stroke: #fff;
                stroke-width: 1.5px; 
            }

            text {
                fill: #000;
                font: 10px sans-serif;
                pointer-events: none; 
            }

        </style>

    </head>

    <body>
        
        <script type="text/javascript">
            
            var links = $links;
            var nodes = {};

            // Compute the distinct nodes from the links. 


            links.forEach(function(link) { 
                link.source = nodes[link.source] || (nodes[link.source] = {name: link.source}); 
                link.target = nodes[link.target] || (nodes[link.target] = {name: link.target}); 
                //link.value = +link.value; 
            });

            var width = 960, height = 500;

            var force = d3.layout.force() 
                .nodes(d3.values(nodes)) 
                .links(links) 
                .size([width, height]) 
                .linkDistance(60) 
                .charge(-300) 
                .on("tick", tick) 
                .start();

            var svg = d3.select("body").append("svg") 
                   .attr("width", width) 
                   .attr("height", height);

            // build the arrow. 
            svg.append("svg:defs").selectAll("marker")
                .data(["end"]) // Different link/path types can be defined here 
                .enter().append("svg:marker") // This section adds in the arrows 
                .attr("id", String) 
                .attr("viewBox", "0 -5 10 10") 
                .attr("refX", 15) 
                .attr("refY", -1.5) 
                .attr("markerWidth", 6) 
                .attr("markerHeight", 6) 
                .attr("orient", "auto") 
                .append("svg:path") 
                .attr("d", "M0,-5L10,0L0,5");


                // add the links and the arrows 
                var path = svg.append("svg:g").selectAll("path")

                .data(force.links()) 
                    .enter().append("svg:path") 
                    .attr("class", "link") 
                    .attr("marker-end", "url(#end)");

                // define the nodes 
                var node = svg.selectAll(".node") 
                    .data(force.nodes()) 
                    .enter().append("g") 
                    .attr("class", "node") 
                    .call(force.drag);

                // add the nodes 
                node.append("circle") 
                    .attr("r", 5);

                // add the text 
                node.append("text") 
                    .attr("x", 12) 
                    .attr("dy", ".35em") 
                    .text(function(d) { return d.name; });

                // add the curvy lines 
                function tick() { 
                    path.attr("d", function(d) { 
                        var dx = d.target.x - d.source.x, 
                            dy = d.target.y - d.source.y, 
                            dr = Math.sqrt(dx * dx + dy * dy); 

                        return "M" + 
                            d.source.x + "," + 
                            d.source.y + "A" + 
                            dr + "," + 
                            dr + " 0 0,1 " + 
                            d.target.x + "," + 
                            d.target.y; 
                    });

                    node.attr("transform", function(d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    });
                }
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