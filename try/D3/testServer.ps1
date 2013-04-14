param(
    $port=3000,
    $javascriptFile='server.js',
    $endPoint
)

# Get the fullname of the JavaScript file
$server = (Get-ChildItem $javascriptFile).FullName

# Find a running job with the JavaScript file as the name and stop it
Get-Job |
    Where {$_.state -eq 'running' -and $_.name -eq $server} |
    Stop-Job

# Start node.js with the JavaScript file as a background job and name it the file name
Start-Job { node $using:server } -Name $server

# Launch the browser with the localhost, port and endpoint
Start-Process http://localhost:$port/$endPoint