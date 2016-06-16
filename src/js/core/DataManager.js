/*
 * Handles all data that does not need to persist
 * Essentially acts as a cache to reduce soundcloud api requests
 */
class DataManager {

    constructor(){
        this.data = {};
    }

    /* 
     * Returns the value associated with the key, if it exists.
     */
    get(key){
        return this.data[key]; 
    }

    /*
     * Adds a value to the data by key.
     */
    set(key, value){
        this.data[key] = value;
    }

    /*
     * Removes a value from a specified key
     */
    remove(key, value){
        if(!this.exists(key)){
            return false;
        }

        if(typeof this.get(key) !== 'object'){
            return false;
        }

        this.get(key).remove(value);
        return true;
    }

    find(key, value){
        if(!this.exists(key)){
            return false;
        }

        if(typeof this.get(key) !== 'object'){
            return false;
        }

        let data = this.get(key);

        for(var i = 0; i < data.length; i++){
            if(data[i] == value){
                return true;
            }
        }

        return false;
    }

    /*
     * Finds the data associated with a key, and if it is an Array,
     * the value is added to the front of the array.
     */
    unshift(key, value){
        if(!this.exists(key)){
            return false;
        }

        if(typeof this.get(key) !== 'object'){
            return false;
        }

        this.data[key].unshift(value);
        return true;
    }

    /*
     * Finds the data associated with a key, and if it is an Array,
     * the value is added to the end of the array.
     */
    push(key, value){
        if(!this.exists(key)){
            return false;
        }

        if(typeof this.get(key) !== 'object'){
            return false;
        }

        this.data[key].push(value);
        return true;
    }

    /*
     * Returns true if the key exists in the data, false otherwise.
     */
    exists(key){
        return this.data[key] !== undefined;
    }

    /*
     * Clears all stored data, which will force soundcloud api calls
     */
    clear(){
        this.data = {};
    }

    /*
     * Clears stored data for a specified key, which will force a soundcloud api call
     */
    bust(key){
        delete this.data[key];
    }
}