var edge = require('edge');

var invokeCS = edge.func('cs', function() {/*
	async (input) => {
		return "C# welcomes " + input.ToString();
	}
*/});

var invokePS = edge.func('ps', function() {/*
"PowerShell welcomes $($inputFromJS)"
*/});

invokePS('Node.js', function (error, result) {
	if (error) throw error;

	invokeCS('Node.js and ' + result, function (error, result) {
		if (error) throw error;
		console.log(result);
	});
});
