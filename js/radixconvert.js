function convertBin(content)
{
    var ret = "";
    for (var i = 0; i < content.length; i++)
    {
        if (content[i] == ""){
            ret += "\n";
            continue;
        }

        console.log(content[i]);
        
        if (/[^{A-Fa-f0-9}]/g.exec(content[i]))
        {
            var errmsg = "Radix Transfer Error: \n"+
                         "Illegal Character at Line:" + (i+1) + "\n";                        
            showConsole();
            clearConsole();
            console.log(errmsg);
            addLine(errmsg);
            return;
        }        
        ret += parseInt(content[i], 16).toString(2);
        if (i < content.length - 1)
            ret += "\n";

    }

    return ret;
}

function convertHex(content)
{

    var ret = "";
    for (var i = 0; i < content.length; i++)
    {
        if (content[i] == "") {
            ret += "\n";
            continue;
        }

        console.log(content[i]);

        if (/[^{0-9}]/g.exec(content[i]))
        {
            var errmsg = "Radix Transfer Error: \n"+
                         "Illegal Character at Line:" + (i+1) + "\n";
            showConsole();
            clearConsole();
            console.log(errmsg);
            addLine(errmsg);
            return;
        }

        ret += parseInt(content[i], 2).toString(16);

        if (i < content.length - 1)
            ret += "\n";
    }

    return ret;
}