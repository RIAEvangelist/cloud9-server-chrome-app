(
    function(){
        var moduleName='webview';
        var bookmarklet='javascript:'+document.querySelector('setup').innerHTML
                .replace(/\n/g,'')
                .replace(/^\s*|\s(?=\s)|\s*$/,' ');
                
        function invalidAddress(){
            if(hostname.value=='c9.io')
                return;
                
            app.trigger('app.refresh');
        }
        
        function refresh(){
            var webview=document.getElementById('webview-primary')
            webview.src='';
            webview.style.display='none';
        }
        
        function webviewInit(e){
             el.removeEventListener(
                'loadstart',
                webviewInit
            );
            if(bookmarklet)
                e.target.src=bookmarklet
            bookmarklet=false;
            app.trigger('webview.loaded',e.target);
        }
        
        function buildSrc(){
            chrome.storage.sync.get(
                null,
                setSrc
            )
        }
        
        function setSrc(c9Config){
            //console.log(c9Config)
            c9Config=c9Config.server;
            var webview=document.getElementById('webview-primary'),
                inputs=document.getElementById('chosenServer')
                    .getElementsByTagName('input');
            
            webview.style.display='block';
            webview.src=[
                (c9Config.protocol)?c9Config.protocol:inputs[0].placeholder,
                '://',
                (c9Config.username)?c9Config.username:inputs[3].placeholder,
                ':',
                (inputs[4].value.trim())?inputs[4].value.trim():inputs[4].placeholder,
                '@',
                (c9Config.hostname)?c9Config.hostname:inputs[1].placeholder,
                ':',
                (c9Config.port)?c9Config.port:inputs[2].placeholder
            ].join('');
        }
        
        function render(el){
            el.addEventListener(
                'loadstart',
                webviewInit
            );
        }
        
        app.on('login.success',buildSrc);
        app.on('is.not.cloud9',invalidAddress);
        app.on('app.refresh',refresh);
        exports(moduleName,render);    
    }
)();