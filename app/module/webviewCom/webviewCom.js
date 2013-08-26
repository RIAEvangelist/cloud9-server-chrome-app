(
    function(){
        var moduleName='webviewCom';
        
        window.addEventListener(
            'message', 
            receiveMessage
        );
        
        function openCom(webview){
            webview.contentWindow.postMessage(
                {
                    type:'is.cloud9'
                },
                '*'
            );
        }
        
        function receiveMessage(e){
            app.trigger(e.data.type,e.data);
        }
        
        function render(){
            
        }
        
        app.on('webview.loaded',openCom)
        exports(moduleName,render);    
    }
)();