class StorageManager {

    constructor(callback){
        this.fs = require('fs');
        this.path = require('electron').remote.app.getPath('appData');

        this.directory = 'Soundcloud-Client';
        this.file = 'data';

        this.data = {};

        this.initializeStorage();

        this.readFromStorage(function(data){
            this.data = data;
            callback();

        }.bind(this));
    }

    initializeStorage(){
        let directoryPath = this.path + '/' + this.directory;
        let filePath = directoryPath + '/' + this.file;

        // initialize the directory
        if(!this.directoryOrFileExists(directoryPath)){
            this.fs.mkdirSync(directoryPath);
        }
        // initialize the file
        if(!this.directoryOrFileExists(filePath)){
            this.writeToStorage();
        }
    }

    directoryOrFileExists(path){
        try {
            this.fs.accessSync(path, this.fs.F_OK);
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }

    get(property){
        return this.propertyExists(property) ? this.data[property] : null;
    }

    set(property, value){
        this.data[property] = value;
        this.writeToStorage();
    }

    remove(property){
        delete this.data[property];
        this.writeToStorage();
    }

    propertyExists(property){
        return this.data.hasOwnProperty(property) ? true : false;
    }

    writeToStorage(){
        this.fs.writeFileSync(this.path + '/Soundcloud-Client/data', JSON.stringify(this.data), 'utf8', function(err){
            if(err){
                console.log(err);
            }
        });
    }

    readFromStorage(callback){
        this.fs.readFile(this.path + '/Soundcloud-Client/data', 'utf8', function(err, data){

            if(err){
                console.log(err);
                return {};
            }

            callback(JSON.parse(data));
        });
    }
}