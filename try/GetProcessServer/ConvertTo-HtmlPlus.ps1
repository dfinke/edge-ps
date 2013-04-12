function ConvertTo-HtmlPlus {
    param(
        $TableId='example',
        [Parameter(ValueFromPipeline=$true)]
        $Record
    )

    Begin {
        $TableRows = @()
        $datatable = @'
<style type="text/css" title="currentStyle">
    @import "/css/demo_page.css";
    @import "/css/demo_table.css";
</style>
<script type="text/javascript" language="javascript" src="/js/jquery.js"></script>
<script type="text/javascript" language="javascript" src="/js/jquery.dataTables.js"></script>
<script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        $('#example').dataTable();
    } );
</script>
'@
    }

    Process {
        if(!$start) {
            $start  = $true
            $Names = ($Record| Get-Member -MemberType *property).Name 
            $Header = $Names | ConvertTo-THead
        }
   
        $TableRows += "<tr>`r`n"
        $Names | % {
            $TableRows += "<td>{0}</td>`r`n" -f $Record.$_
        }
        $TableRows += "</tr>`r`n"

    }

    End {
@"
$datatable 
<table cellpadding="0" cellspacing="0" border="0" class="display" id="$TableId" width="100%">
$Header
$TableRows
</table>
"@
    }
}
