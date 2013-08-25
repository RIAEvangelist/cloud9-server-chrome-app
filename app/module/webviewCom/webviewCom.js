(
    function(){
        var moduleName='webviewCom';
        
        function openCom(webview){
            webview.contentWindow.postMessage(
                'init',
                '*'
            );
            
            window.addEventListener(
                'message', 
                receiveMessage
            );
        }
        
        function receiveMessage(e){
            console.log(e)
            app.trigger('webviewCom.message.from',e);
        }
        
        function render(){
            
        }
        
        app.on('webview.loaded',openCom)
        exports(moduleName,render);    
    }
)();