(
    function(){
        var moduleName='login';
        
        function fillForm(data,el){
            if(!data.server)
                return;
            for(var i in data.server){
                document.getElementById(i).value=data.server[i]
            }
        }
        
        function render(el){
            chrome.storage.sync.get(
                null,
                function(data){
                    fillForm(data,el);
                }
            );
            el.querySelector('form').addEventListener(
                'submit',
                function(e){
                    var hostname=e.target.querySelector('input[name="MyC9Hostname"]');
                    if(!hostname.value.trim()){
                        hostname.classList.add('invalid');
                        return;
                    }
                    
                    var inputs=e.target.getElementsByTagName('input'),
                        c9Config={};
                    
                    for(var i in inputs){
                        if(!(parseInt(i)>=0))
                            continue;
                        var input=inputs[i],
                            val=input.value.trim();
                        if(!val || input.type=='password')
                            continue;
                        c9Config[input.id]=val;
                    }
                    
                    chrome.storage.sync.set(
                        {
                            server:c9Config
                        }
                    );
                    
                    var webview=document.getElementsByTagName('webview')[0]
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
            );
        }
        
        exports(moduleName,render);    
    }
)();