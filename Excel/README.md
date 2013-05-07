## Node.js + Edge.js + Edge-ps (PowerShell) + Excel 

```javascript
var edge = require('edge');

var excelPS = edge.func('ps', function () {/*
    
    $data = $inputFromJS | Invoke-Expression
    
    $xl = New-Object -ComObject Excel.Application    
    $wf = $xl.WorksheetFunction    

    New-Object PSObject -Property @{
        Median = $wf.Median($data)
        StDev  = $wf.StDev($data)
        Var    = $wf.Var($data)
    } | ConvertTo-Json

    $xlProcess = Get-Process excel
    $xlProcess.kill()   
*/});

// Invoke PowerShell, it start Excel, gets a WorksheetFunction and then calls
// Median, StDev and Var on the array of data passed in.
// Here we are passing an array of 1 to 100
excelPS('1..100', function(error, result){
    
    if(error) throw error;
    
    console.log(result[0]);
});
```

```
{
    "Median":  50.5,
    "StDev":  29.011491975882016,
    "Var":  841.66666666666663
}
```