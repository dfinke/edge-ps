var edge = require('edge');

var hello = edge.func('ps', function() {/*

$psVersion = $PSVersionTable.PSVersion.ToString()

@"
PowerShell v${psVersion} welcomes 
	${inputFromJS} on $(Get-Date)
"@
*/});

hello('Node.js', function (error, result) {
	if (error) throw error;
	console.log(result[0]);
});
