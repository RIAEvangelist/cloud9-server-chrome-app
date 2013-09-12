(
    function(){
        var moduleName='storedServers';
        
        function fillForm(data,el){
            if(!data.list)
                return;
            console.log(el)
            for(var i in data.list){
                el.innerHTML+=[
                    '<li>',
                    i,
                    '</li>'
                ].join('');
            }
            
        }
        
        function render(el){
            var serverList=el.querySelector('#serverList');
            chrome.storage.sync.get(
                null,
                function(data){
                    fillForm(data,serverList);
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