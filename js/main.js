/*
 * Copyright (c) 2016 He Yu <kiddmagician@gmail.com>
 * All Rights Reserved.
*/

const {dialog} = require("electron").remote;

setMenu();
function setMenu() {
    const remote = require('electron').remote;
    const Menu = remote.Menu;
    const MenuItem = remote.MenuItem;

    var template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    role: 'new'
                },
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    role: 'open'
                },

                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    role: 'save'
                },
                {
                    label: 'Save as',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    role: 'save as'
                },
                {
                    label: 'Print',
                    accelerator: 'CmdOrCtrl+P',
                    role: 'print'
                },
                {
                    label: 'Exit',
                    click: function () {
                        window.close();
                    }
                }

            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CmdOrCtrl+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'CmdOrCtrl+A',
                    role: 'selectall'
                },
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.reload();
                    }
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: (function () {
                        if (process.platform == 'darwin')
                            return 'Ctrl+Command+F';
                        else
                            return 'F11';
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: (function () {
                        if (process.platform == 'darwin')
                            return 'Alt+Command+I';
                        else
                            return 'Ctrl+Shift+I';
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.toggleDevTools();
                    }
                },
            ]
        },
        {
            label: 'Window',
            role: 'window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                {
                    label: 'Close',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                },
            ]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: function () { require('electron').shell.openExternal('http://electron.atom.io') }
                },
            ]
        },
    ];

    if (process.platform == 'darwin') {
        var name = require('electron').remote.app.getName();
        template.unshift({
            label: name,
            submenu: [
                {
                    label: 'About ' + name,
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Services',
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ' + name,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Alt+H',
                    role: 'hideothers'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function () { app.quit(); }
                },
            ]
        });
        // Window menu.
        template[3].submenu.push(
            {
                type: 'separator'
            },
            {
                label: 'Bring All to Front',
                role: 'front'
            }
        );
    }

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}


var app_status = {
    'changed': false,
    'first_saved': false,
    'save_dir': "",
};

var asm_editor, bin_editor;

window.onload = function () {


    asm_editor = ace.edit("asm-editor");
    asm_editor.setTheme("ace/theme/xcode");
    asm_editor.getSession().setMode("ace/mode/mips_assembler");
    asm_editor.setValue('');

    document.getElementById("asm-editor").style.fontSize = "18px";

    bin_editor = ace.edit("bin-editor");
    bin_editor.setTheme("ace/theme/xcode");
    bin_editor.getSession().setMode("ace/mode/mips_assembler");
    bin_editor.setValue('');
    
    
    
    document.getElementById("bin-editor").style.fontSize = "18px";


    asm_editor.on("change", function () {
        app_status.changed = true;
    });
  
    $("nav li").hover(function(){
        var icon = $(this).find(".icon-desc");
        icon.css("display", "inline-flex");
        icon.css("margin", "0 20px");        
    }, 
    function(){
        $(this).find(".icon-desc").fadeOut();
    });

    $("#modal-confirm").click(
        function () {
            switch ($("#modal-target").val())
            {
                case "new":
                    newFile();
                    break;

                case "open":
                    openFile();
                    break
            }
        }
    );

    $("#btn-new").click(function () {
        if(app_status.changed) {
            $(".modal-body").text("创建新文件将会导致目前未保存的文件丢失， 是否继续？");
            $("#Modal").modal('toggle');
            $("#modal-target").val("new");
        }else{
            $("#modal-target").val("new");
            $("#modal-confirm").click();
        }
    });

    $("#btn-open").click(function () {
        if(app_status.changed) {
            $(".modal-body").text("打开新文件会导致目前未保存的文件丢失， 是否继续？");
            $("#Modal").modal('toggle');
            $("#modal-target").val("open");
        }else{
            $("#modal-target").val("open");
            $("#modal-confirm").click();
        }
    });

    $("#btn-save").click(function () {
        if (app_status.first_saved == false)
        {
            dialog.showSaveDialog(function (path) {
                app_status.first_saved = true;
                app_status.save_dir = path;
                app_status.changed = false;
                console.log(path);
                save(app_status.save_dir, getContent());
            });
        }else{
            save(app_status.save_dir, getContent());
            app_status.changed = false;
        }
    });

    $("#output-bin").click(function () {
        $("#btn-asm").click();
        $("#radix-bin").click();

        var content = bin_editor.getValue().split("\n");

        var sum = 0;

        for (var i = 0; i < content.length; i++)
        {
            if (content[i] == "")
                continue;
            sum = sum + praseInt(content[i], 2);
        }

        console.log(sum);

        dialog.showSaveDialog(function (path) {
            save(path, sum);
        });

    });

    $("#output-coe").click(function () {
        var model = `memory_initialization_radix=16;\n
        memory_initialization_vector=
        `;

        $("#btn-asm").click();

        $("#radix-hex").click();

        var content = bin_editor.getValue().split("\n");
        content = content.join(",");
        content = content + ";";

        console.log(model+content);

        dialog.showSaveDialog(function (path) {
            save(path, model+content);
        });
    });

    
    $("#btn-asm").click(function(){
        var content = asm_editor.getValue().split("\n");
        var bin_code_arr = assemble(content);
        var bin_code = "";

        console.log(content);
        console.log(bin_code);
        console.log(bin_code_arr);
        var cur_line = 0;
        for (var i = 0; i < bin_code_arr.length; i++)
        {

            console.log(parseInt(bin_code_arr[i].line) - cur_line-1);
            bin_code += "\n".repeat(parseInt(bin_code_arr[i].line)-cur_line);
            cur_line = parseInt(bin_code_arr[i].line);

            bin_code += bin_code_arr[i].instruction.code;
        }
        current_radix = "binary";
        bin_editor.setValue("");
        bin_editor.setValue(bin_code);
    });
    
    $("#btn-dasm").click(function(){
        var content = bin_editor.getValue().split("\n");
        deassemble(content);
    });
    
    var console_count = 0;
    $("#btn-console").click(function(){        
       console_count = 1 - console_count;       
       if (console_count == 1)
       {
           showConsole();
       }else{
           hideConsole();
       }    
    });

    var current_radix = 'binary';
    
    $("#radix-bin").click(function(){
        if (current_radix == "hex") {
            var content = bin_editor.getValue().split("\n");
            bin_editor.setValue(convertBin(content));
            current_radix = 'binary';
        }
    });
    
    $("#radix-hex").click(function(){
        if (current_radix == 'binary') {
            var content = bin_editor.getValue().split("\n");
            bin_editor.setValue(convertHex(content));
            current_radix = 'hex';
        }
    });  
};

function newFile()
{
    app_status.changed = false;
    app_status.first_saved = false;
    app_status.save_dir = "";

    bin_editor.setValue("");
    asm_editor.setValue("");
}

function openFile()
{

    app_status.changed = false;
    app_status.first_saved = true;

    dialog.showOpenDialog(function (path) {
        open(path[0], function (err, data) {
            if (err)
            {
                showConsole();
                addLine("Open Error:" + err);
            }else{
                asm_editor.setValue(data);
                app_status.changed = false;
                app_status.first_saved = true;
                app_status.save_dir = path[0];
            }
        });
    });
}

function getContent()
{
    return asm_editor.getValue();
}

