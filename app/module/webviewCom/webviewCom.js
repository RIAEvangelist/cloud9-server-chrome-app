(
    function(){
        var moduleName='webviewCom';
        var testing=false;
        
        window.addEventListener(
            'message', 
            receiveMessage
        );
        
        function openCom(webview){
            console.log('com open')
            if(testing)
                return;
                
            if(!webview.contentWindow)
                return;
            
            (
                function(){
                    testing=setInterval(
                        function(){
                            console.log('checking')
                            webview.contentWindow.postMessage(
                                {
                                    type:'is.cloud9',
                                    chromeApp:true
                                },
                                '*'
                            );
                        },
                        500
                    );
                }
            )(webview);
        }
        
        function receiveMessage(e){
            console.log(e);
            app.trigger(e.data.type,e.data);
            clearInterval(testing);
            testing=false;
        }
        
        function render(){
            
        }
        
        app.on('webview.loaded',openCom)
        exports(moduleName,render);    
    }
)();