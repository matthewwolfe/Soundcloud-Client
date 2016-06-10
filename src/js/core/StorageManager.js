class StorageManager extends Core {

    constructor(callback){
        super();

        this.fs = require('fs');
        this.data = {};

        this.readFromStorage(function(data){
            this.data = data;
            callback();

        }.bind(this));
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
        this.fs.writeFile('./storage/data', JSON.stringify(this.data), 'utf8', function(err){
            if(err){
                console.log(err);
            }
        });
    }

    readFromStorage(callback){
        this.fs.readFile('./storage/data', 'utf8', function(err, data){

            if(err){
                console.log(err);
                return {};
            }

            callback(JSON.parse(data));
        });
    }
}