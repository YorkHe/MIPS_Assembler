var console_el = $("#console >ul");

var console_content = [];
var length = 0;

var showConsole = function(){
           $("#asm-editor").css("height", "70%");
           $("#console").css("height", "30%");
};

var hideConsole = function(){
           $("#asm-editor").css("height", "100%");
};

function clearConsole()
{
    console_content = [];
    console_el.empty();
}

function addLine(content)
{
    var lines = content.split('\n');

    console.log(lines);
        
    for (var i = 0; i < lines.length; i++)
    {
        var li = $('<li class="console_line">'+lines[i]+'</li>');
        if (length > 3){
            length = length -1;            
            console_el.children("li").first().remove();
        }
        length = length + 1;
        console_el.append(li);     
    }    
}