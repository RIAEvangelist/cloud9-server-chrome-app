(
    function(){
        var moduleName='storedServers';
        
        function fillForm(data,el){
            if(!data.list)
                return;
            //console.log(data)
            for(var i in data.list){
                var li=document.createElement('li');
                li.dataset.c9Config=JSON.stringify(data.list[i]);
                //console.log(li.dataset.c9Config)
                li.innerHTML=i;
                el.appendChild(li);
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
            
            el.querySelector('ul').addEventListener(
                'click',
                function(e){
                    var inputs=document.querySelectorAll('.login input'),
                        c9Config=JSON.parse(e.target.dataset.c9Config);
                    
                    for(var i in inputs){
                        if(!(parseInt(i)>=0))
                            continue;
                        var input=inputs[i];
                        if(!c9Config[inputs[i].id])
                            continue;
                        input.value=c9Config[inputs[i].id];
                    }
                }
            );
        }
        
        exports(moduleName,render);    
    }
)();