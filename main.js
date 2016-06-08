const electron = require('electron');
const fs       = require('fs');
const _        = require('lodash');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow(){

    mainWindow = new BrowserWindow({width: 800, height: 600});

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