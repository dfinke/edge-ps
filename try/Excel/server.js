var express = require('express')
var http    = require('http'); 
var edge    = require('edge');
var app     = express();
var port    = 3000;

var ps=edge.func('ps', function(){/*

param($data=1..100)
 
$xl = New-Object -ComObject Excel.Application
$xlProcess = Get-Process excel
$wf = $xl.WorksheetFunction

#$data = $data | Invoke-Expression
 
$r = New-Object PSObject -Property @{
    Median = $wf.Median($data)
    StDev  = $wf.StDev($data)
    Var    = $wf.Var($data)
} 
 
$xlProcess.kill()

@"
    <h2>Calling Excel Worksheet Functions in PowerShell in a Node.js web server</h2>
    <table border='1'>
    <tr><td>Median</td><td>$($r.Median)</td></tr>
    <tr><td>StDev</td><td>$($r.StDev)</td></tr>
    <tr><td>Var</td><td>$($r.Var)</td></tr>
    </table>
"@

*/})

app.get('/', function(req, res){
    
    ps('', function(err, result){
        
        if(err) throw err;

        res.send(200, result[0]);
    });   
});

http.createServer(app).listen(port, function(){
  console.log('point your browser here: http://localhost:' + port);
});