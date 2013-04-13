function ConvertTo-SlickGrid {
    param(
        [Parameter(ValueFromPipeline=$true)]
        $Record
    )

    Begin {
        $Data = @()
    }

    Process {
        if(-not $FirstTimeThru) {
            $Columns = ($Record | Get-Member -MemberType *property).Name | 
                ForEach {
                    [PSCustomObject]@{
                        id    = $_
                        name  = $_
                        field = $_
                    }
                }
            $FirstTimeThru = $true
        }
        
        $dataHash = @{}
        ForEach($ColumnName in $Columns) {
            $dataHash.($ColumnName.name) = $Record.($ColumnName.name)            
        }

        $Data += $dataHash
    }

    End {

@"
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
    
    <title>SlickGrid PowerShell Example: Basic grid</title>

    <link rel="stylesheet" href="css/slick.grid.css" type="text/css"/>
    <link rel="stylesheet" href="css/smoothness/jquery-ui-1.8.16.custom.css" type="text/css"/>    
    <link rel="stylesheet" href="css/examples.css" type="text/css"/>
</head>
<body>

<h2>SlickGrid PowerShell Example: Basic grid</h2>
<table width="100%">
  <tr>
    <td valign="top" width="50%">
      <div id="myGrid" style="width:600px;height:500px;"></div>
    </td>
  </tr>
</table>

<script src="lib/jquery-1.7.min.js"></script>
<script src="lib/jquery.event.drag-2.2.js"></script>

<script src="js/slick.core.js"></script>
<script src="js/slick.grid.js"></script>

<script>

    var grid;
    var columns = $($Columns | ConvertTo-Json -Compress);
    var data    = $($Data| ConvertTo-Json -Compress);
    
    var options = {
        enableCellNavigation: true,
        enableColumnReorder: false
    };

    `$(function () {
        grid = new Slick.Grid("#myGrid", data, columns, options);
    })

</script>
</body>
"@    
    }
}