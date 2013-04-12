function ConvertTo-THead {
   param(     
        [Parameter(ValueFromPipeline=$true)]
        $Record
    )

    Begin {
        $header = @()
        $header += "<thead>`r`n"
    }

    Process {
        $header += "<th>{0}</th>`r`n" -f $Record
    }

    End {
        $header += "</thead>`r`n"
        $header
    }
}