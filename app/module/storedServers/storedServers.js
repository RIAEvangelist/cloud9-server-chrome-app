(
    function(){
        var moduleName='storedServers';
        var list={};
        
        function fillForm(data,el){
            el.innerHTML='';
            if(!data.list)
                return;
            list=data.list;
            //console.log(data)
            for(var i in data.list){
                var li=document.createElement('li');
                li.dataset.c9Config=JSON.stringify(data.list[i]);
                li.dataset.hostname=i;
                //console.log(li.dataset.c9Config)
                li.innerHTML=i+'<button>X</button>';
                el.appendChild(li);
            }
            
        }
        
        function removeServer(e){
            delete list[e.target.parentElement.dataset.hostname];
             
             chrome.storage.sync.set(
                {
                    list:list
                },
                function(){
                    app.trigger('app.refresh');
                }
            );
        }
        
        function refresh(){
            var serverList=document.querySelector('#serverList');
            chrome.storage.sync.get(
                null,
                function(data){
                    fillForm(data,serverList);
                }
            );
        }
        
        function render(el){
            refresh();
            
            el.querySelector('ul').addEventListener(
                'click',
                function(e){
                    if(e.target.tagName=='BUTTON'){
                        removeServer(e);
                        return;
                    }
                    
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
        
        app.on('app.refresh',refresh);
        exports(moduleName,render);    
    }
)();