const {app, BrowserWindow, globalShortcut} = require('electron');
const fs = require('fs');

let mainWindow;

function createWindow(){

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            scrollBounce: true
        }
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

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

    globalShortcut.register('MediaPlayPause', function(){
        mainWindow.webContents.send('click-play-pause');
    });

    globalShortcut.register('MediaNextTrack', function(){
        mainWindow.webContents.send('click-next-track');
    });

    globalShortcut.register('MediaPreviousTrack', function(){
        mainWindow.webContents.send('click-previous-track');
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