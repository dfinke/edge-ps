using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Management.Automation;
using System.Threading.Tasks;

public class EdgeCompiler
{
    public Func<object, Task<object>> CompileFunc(IDictionary<string, object> parameters)
    {
        var script = this.NormalizeSource(parameters["source"] as string);

        return (input) =>
        {
            var task = new Task<object>(() =>
            {
                PowerShell powershell = PowerShell.Create();
                powershell.AddScript(script);

                powershell.AddParameter("inputFromJS", input);
                powershell.AddParameter("parameters", parameters);

                return powershell.Invoke().Select(psobject => psobject.BaseObject).ToList();
            });

            task.Start();

            return task;
        };
    }

    private string NormalizeSource(string source)
    {
        if (source.EndsWith(".ps1", StringComparison.InvariantCultureIgnoreCase))
        {
            // Read source from file
            source = File.ReadAllText(source);
        }
        else
        {
            source = "param($inputFromJS, $parameters)\r\n" + source;
        }

        return source;
    }
}
