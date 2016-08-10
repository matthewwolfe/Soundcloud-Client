import { node } from './soundcloud/config';

/*
 * Constants
 */
const fs = node.fs;
const path = node.electron.remote.app.getPath('appData');

const directory = 'Soundcloud-Client';
const file = 'data';

/*
 * Variables
 */
let data = {};

/*
 * Export Functions
 */
export function initialize(callback){
    initializeStorage();

    readFromStorage(function(dataFromStorage){
        data = dataFromStorage;
        callback();

    });
}

export function get(property){
    return propertyExists(property) ? data[property] : null;
}

export function set(property, value){
    data[property] = value;
    writeToStorage();
}

export function remove(property){
    delete data[property];
    writeToStorage();
}

/*
 * Internal Functions
 */
function initializeStorage(){
    let directoryPath = path + '/' + directory;
    let filePath = directoryPath + '/' + file;

    // initialize the directory
    if(!directoryOrFileExists(directoryPath)){
        fs.mkdirSync(directoryPath);
    }
    // initialize the file
    if(!directoryOrFileExists(filePath)){
        writeToStorage();
    }
}

function directoryOrFileExists(path){
    try {
        fs.accessSync(path, fs.F_OK);
        return true;
    } catch(err){
        console.log(err);
        return false;
    }
}

function propertyExists(property){
    return data.hasOwnProperty(property) ? true : false;
}

function writeToStorage(){
    fs.writeFileSync(path + '/Soundcloud-Client/data', JSON.stringify(data), 'utf8', function(err){
        if(err){
            console.log(err);
        }
    });
}

function readFromStorage(callback){
    fs.readFile(path + '/Soundcloud-Client/data', 'utf8', function(err, data){

        if(err){
            console.log(err);
            return {};
        }

        callback(JSON.parse(data));
    });
}
