function(){
    if(window.myCloud9IDEChromeApp)
        return;
        
    window.myCloud9IDEChromeApp=true;
    var IDE=false,
        IDEOrigin='*';
    
    window.addEventListener(
        'message', 
        IDEMessage, 
        false
    );
    
    console.log('loaded');
    
    window.addEventListener(
        'load',
        IDEReady
    );
    
    function IDEReady(e){
        var body=document.querySelector('body');
        if(!body)
            return;
        
        body.appendChild(
            newIDEStyle
        );
        
        body.addEventListener(
            'click',
            handleNewWindow
        );
        
        if(!IDE)
            return;
        
        if(!window.cloud9config){
            IDE.postMessage(
                {
                    type:'is.not.cloud9'
                },
                IDEOrigin
            );
        }
    }
    
    function IDEMessage(e){
        if(!e.data.chromeApp)
            return;
        if(!IDE)
            IDE=e.source;
        
        if(e.data.type=='is.cloud9'){
            var type='is.cloud9';
            if(!window.cloud9config){
                type='is.not.cloud9';
            }
            
            e.source.postMessage(
                {
                    type:type
                },
                IDEOrigin
            );
        }
        
        handleNewWindow();
    }
    
    function handleNewWindow(e){
        var links=document.querySelectorAll('a[target="_blank"]');
        for(var i in links){
            if(!links[i].target)
                continue;
                
            links[i].target='';
        }
    }
    
    var newIDEStyle=document.createElement('style');
    newIDEStyle.innerHTML='\
        #menu,\
        .sign-up,\
        .sign-in-instantly,\
        .recent-article,\
        .page-body,\
        .footer,\
        .follow-icons,\
        .sign-up-services,\
        .follow_us,\
        .addthis_toolbox,\
        .github-signin,\
        .bitbucket-signin,\
        .signin_options,\
        .social{\
            display:none!important;\
        }\
    ';
}