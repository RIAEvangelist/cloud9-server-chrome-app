(
    function(){
        var moduleName='login',
        list={};
        
        function fillForm(data){
            var el=document.querySelector('.login');
            if(data.list)
                list=data.list;
                
            if(!data.server)
                return;
            for(var i in data.server){
                document.getElementById(i).value=data.server[i]
            }
        }
        
        function getData(){
            chrome.storage.sync.get(
                null,
                function(data){
                    fillForm(data);
                }
            );
        }
        
        function render(el){
            getData();
            el.querySelector('#chosenServer').addEventListener(
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
                    if(!c9Config.port)
                        c9Config.port=e.target.querySelector('input[name="MyC9Port"]').placeholder;
                    
                    var storageData={
                        server:c9Config
                    }
                    
                    list[
                        [
                            c9Config.hostname,
                            c9Config.port
                        ].join(':')
                    ]=c9Config;
                    storageData.list=JSON.parse(JSON.stringify(list));
                    
                    chrome.storage.sync.set(
                        storageData,
                        function(e){
                            getData();
                            app.trigger('app.refresh');
                            app.trigger('login.success');
                        }
                    );
                }
            );
        }
        
        app.on('app.refresh',getData);
        exports(moduleName,render);    
    }
)();