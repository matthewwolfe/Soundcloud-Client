/*
 * @param url: String
 * @param callback: Function
 *
 * @return void
 */ 
export function get(url, callback){
    request('GET', url, {}, callback);
}

/*
 * @param url: String
 * @param callback: Function
 *
 * @return void
 */ 
export function put(url, callback){
    request('PUT', url, {}, callback);
}

/*
 * @param url: String
 * @param callback: Function
 *
 * @return void
 */ 
export function delete(url, callback){
    request('DELETE', url, {}, callback);
}

/*
 * @param url: String
 * @param callback: Function
 * @param data: Object
 *
 * @return void
 */ 
export function post(url, data, callback){
    request('POST', url, data, callback);
}

/*
 * @param type: String
 * @param url: String
 * @param data: Object
 * @param callback: Function
 *
 * @return void
 */ 
request(type, url, data, callback){
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == XMLHttpRequest.DONE){
            callback(JSON.parse(xmlhttp.responseText));
        }
    };

    xmlhttp.open(type, url, true);

    if(type === 'POST'){
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        data = this.configurePostData(data);
        xmlhttp.send(data);
    } else {
        xmlhttp.send();
    }
}

/*
 * Encodes the data object to a string so that it can be sent as get parameters 
 *
 * @param data: Object
 *
 * @return: String
 */ 
configurePostData(data){
    let query = [];
    for (let key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }

    data = query.join('&');

    return data;
}