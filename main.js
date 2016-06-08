const electron = require('electron');
const fs = require('fs');
const _ = require('lodash');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

let storageData = {};

function createWindow(){

    mainWindow = new BrowserWindow({width: 800, height: 600});

    if(_.has(storageData, 'userAuthCode')){
        mainWindow.loadURL('file://' + __dirname + '/index.html?userAuthCode=' + storageData.userAuthCode);
    }
    
    mainWindow.loadURL('https://api.soundcloud.com/connect?client_id=173bf9df509c48cf53b70c83eaf5cbbd&redirect_uri=my-app%3A%2F%2Fcallback.html&response_type=code');

    mainWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl){
        let url = require('url');
        let url_parts = url.parse(newUrl, true);
        let query = url_parts.query;

        if(query.code){
            addPropertyToData('userAuthCode', query.code);

            mainWindow.loadURL('file://' + __dirname + '/index.html?userAuthCode=' + query.code);
        }
    });

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
}

function fileOrDirectoryExists(path){
    path = __dirname + path;

    try {
        fs.accessSync(path, fs.F_OK);

        return true;
    } catch(e){
        return false;
    }
}

function initializeStorage(callback){
    if(fileOrDirectoryExists('/storage')){

        if(fileOrDirectoryExists('/storage/data')){
            readJSON(function(data){
                
                storageData = data;
                callback();
            });
        } else {
            // initialize the data file to be empty
            writeJSON(storageData);
            callback();
        }
    } else {
        // make the storage directory
        fs.mkdirSync('./storage');
        callback();
    }
}

function writeJSON(data){
    fs.writeFileSync('./storage/data', JSON.stringify(data), 'utf8', function(err){
        if(err){
            console.log(err);
        }
    });
}

function readJSON(callback){
    fs.readFile('./storage/data', 'utf8', function(err, data){

        if(err){
            console.log(err);
            return {};
        }

        callback(JSON.parse(data));
    });
}

function addPropertyToData(property, data){
    storageData[property] = data;
    writeJSON(storageData);
}

app.on('ready', function(){
    initializeStorage(function(){
        createWindow();
    });
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