/*
 * Handles all data that does not need to persist
 */
class DataManager {

	constructor(){
		this.data = {};
	}

	get(key){
		return this.data[key]; 
	}

	set(key, value){
		this.data[key] = value;
	}

	exists(key){
		return this.data[key] !== undefined;
	}
}