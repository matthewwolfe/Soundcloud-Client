class Core {
    constructor(){}

    get(url, callback){
        var xmlhttp;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
               if(xmlhttp.status == 200){
                    callback(JSON.parse(xmlhttp.responseText));
               }
            }
        };

        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }

    post(url, data, callback){
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }

        data = query.join('&');

        var xmlhttp;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }

        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
               if(xmlhttp.status == 200){
                    callback(JSON.parse(xmlhttp.responseText));
               }
            }
        };

        xmlhttp.send(data);
    }
}    