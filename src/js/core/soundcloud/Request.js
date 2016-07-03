class Request {

    constructor(){}

    /*
     * @param url: String
     * @param callback: Function
     *
     * @return void
     */ 
    get(url, callback){
        this.request('GET', url, {}, callback);
    }

    /*
     * @param url: String
     * @param callback: Function
     *
     * @return void
     */ 
    put(url, callback){
        this.request('PUT', url, {}, callback);
    }

    /*
     * @param url: String
     * @param callback: Function
     *
     * @return void
     */ 
    delete(url, callback){
        this.request('DELETE', url, {}, callback);
    }

    /*
     * @param url: String
     * @param callback: Function
     * @param data: Object
     *
     * @return void
     */ 
    post(url, data, callback){
        this.request('POST', url, data, callback);
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
}