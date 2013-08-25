window.addEventListener(
    'openCommunications',
    openCommunications
)

function openCommunications(){
    document.querySelector('webview').contentWindow.postMessage(
        'init',
        'http://grooveshark.com'
    );
}