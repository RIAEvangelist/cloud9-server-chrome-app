var IDE={};
var screenWidth = screen.availWidth,
    screenHeight = screen.availHeight,
    width=screenWidth/2,
    height=screenHeight/1.5,
    minWidth=883,
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
                    width: width,
                    height: height,
                    left: Math.round((screenWidth-width)/2),
                    top: Math.round((screenHeight-height)/2)
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
    IDE.cloud9=IDE.window.document.querySelector('webview');
    IDE.controls=IDE.window.document.querySelector('header');
    
    IDE.cloud9.addEventListener(
        'loadstop',
        IDEIsC9
    );
    IDE.controls.addEventListener(
        'click',
        controlEvent
    );
}

function controlEvent(e){
    switch(e.target.id){
        case 'close':
            IDE.window.chrome.app.window.current().close();
            break;
        case 'min':
            IDE.window.chrome.app.window.current().minimize();
            break;
        case 'max':
            if(IDE.window.chrome.app.window.current().isFullscreen()){
                IDE.window.chrome.app.window.current().restore();
                break;
            }
            IDE.window.chrome.app.window.current().fullscreen();
            break;
    }
}

function IDEIsC9(e){
    IDE.cloud9.src='javascript:'+IDE.window.document.querySelector('setup').innerHTML
        .replace(/\n/g,'')
        .replace(/^\s*|\s(?=\s)|\s*$/,' ');
}