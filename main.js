var IDE={};
var screenWidth = screen.availWidth,
    screenHeight = screen.availHeight,
    width=screenWidth/2,
    height=screenHeight/1.5,
    minWidth=979,
    minHeight=537;
chrome.runtime.requestUpdateCheck(updateCheck);

function updateCheck(status){
    if(status=="no_update")
        return;
    chrome.runtime.reload();
}

chrome.app.runtime.onLaunched.addListener(
    function() {
        if(IDE.window){
            if(IDE.window.chrome.app.window.id){
                IDE.window.chrome.app.window.current().show();
                return;
            }
        }
        
        chrome.app.window.create(
            'index.html', 
            {
                id:'IDE',
                singleton:true,
                bounds: {
                    width   : Math.round(width),
                    height  : Math.round(height),
                    left    : Math.round((screenWidth-width)/2),
                    top     : Math.round((screenHeight-height)/2)
                },
                minWidth:minWidth,
                minHeight:minHeight,
                maxWidth:screenWidth,
                maxHeight:screenHeight,
                frame:'none'
            },
            appOpened
        );
    }
);
    
function appOpened(e){
    e.contentWindow.onload=IDE.onload;
    IDE.window=e.contentWindow;
    IDE.window.chrome.app.window.current().resizeTo(width,height);
}

IDE.onload=function(e){
    
}