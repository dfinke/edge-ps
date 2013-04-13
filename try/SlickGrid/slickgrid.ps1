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
        @{
            columns = $Columns
            data    = $Data
        } | ConvertTo-Json
    }
}

#cls
#ps | select name, company, handles | ConvertTo-SlickGrid