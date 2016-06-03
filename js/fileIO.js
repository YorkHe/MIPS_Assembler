/**
 * Created by 宇 on 2016/6/2.
 */

var fs = require("fs");

function save(dir, content)
{

    if (process.platform == "win32")
    {
        content = content.replace(/\n/g, "\r\n");
    }

    fs.writeFile(dir, content , function (err) {
        if (err)
        {
            showConsole();
            addLine("Save Error: "　+ err);
        }else{
            addLine("Save Successfully!");
        }
    });
}

function open(dir, callback)
{
    fs.readFile(dir,'utf-8', callback);
}