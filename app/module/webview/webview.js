(
    function(){
        var moduleName='webview';
        
        function readMessage(e){
            console.log(e);
        }
        
        function webviewInit(e){
            e.target.src='javascript:'+document.querySelector('setup').innerHTML
                .replace(/\n/g,'')
                .replace(/^\s*|\s(?=\s)|\s*$/,' ');
                
            app.trigger('webview.loaded',e.target);
        }
        
        function buildSrc(){
            chrome.storage.sync.get(
                null,
                setSrc
            )
        }
        
        function setSrc(c9Config){
            c9Config=c9Config.server;
            var webview=document.getElementById('webview-primary'),
                inputs=document.getElementsByTagName('form')[0]
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
                'loadstop',
                webviewInit
            );
        }
        
        app.on('login.success',buildSrc);
        app.on('webviewCom.message.from',readMessage);
        exports(moduleName,render);    
    }
)();