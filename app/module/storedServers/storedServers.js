(
    function(){
        var moduleName='storedServers';
        
        function fillForm(data,el){
            if(!data.server)
                return;
            
            console.log(data);
            
            /*
            for(var i in data.server){
                document.getElementById(i).value=data.server[i]
            }
            */
        }
        
        function render(el){
            console.log('get stored servers')
            chrome.storage.sync.get(
                null,
                function(data){
                    fillForm(data,el);
                }
            );
            /*
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
                    
                    app.trigger('login.success')
                    
                }
            );
            */
        }
        
        exports(moduleName,render);    
    }
)();