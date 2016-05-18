const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow(){

    mainWindow = new BrowserWindow({width: 800, height: 600});
    
    mainWindow.loadURL('https://api.soundcloud.com/connect?client_id=173bf9df509c48cf53b70c83eaf5cbbd&redirect_uri=my-app%3A%2F%2Fcallback.html&response_type=code');

    mainWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl){
        let url = require('url');
        let url_parts = url.parse(newUrl, true);
        let query = url_parts.query;

        if(query.code){
            mainWindow.loadURL('file://' + __dirname + '/index.html?userAuthCode=' + query.code);
        }
    });

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
}

app.on('ready', function(){
    createWindow();
});

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', function(){
    if(mainWindow === null){
        createWindow();
    }
});