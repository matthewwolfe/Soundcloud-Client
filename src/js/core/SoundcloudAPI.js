

class SoundcloudAPI extends Core {

    constructor(callback){
        super();

        this.clientID = '173bf9df509c48cf53b70c83eaf5cbbd';
        this.clientSecret = '7ddbd6fcdc2d313abfb65758c751486e';
        this.baseUrl = 'https://api.soundcloud.com';

        this.userAuthCode = this.getAuthCode();

        let that = this;

        this.getToken(function(response){
            that.userToken = response;
            
            that.getMe(function(response){

                window.user = response;

                callback();
            });
        });
    }

    getAuthCode(){
        let url = window.location.href;
        return url.substring(url.indexOf('=') + 1);
    }

    getToken(callback){
        let url = this.baseUrl + '/oauth2/token';

        let data = {
            'client_id': this.clientID,
            'client_secret': this.clientSecret,
            'grant_type': 'authorization_code',
            'redirect_uri': 'my-app://callback.html',
            'code': this.userAuthCode
        };

        this.post(url, data, function(response){
            callback(response);
        });
    }

    getMe(callback){
        let url = this.baseUrl + '/me?oauth_token=' + this.userToken.access_token;

        this.get(url, function(response){
            callback(response);
        });
    }

    getLikedTracks(callback){
        let url = this.baseUrl + '/users/' + window.user.id + '/favorites?limit=100&offset=0&client_id=' + this.clientID;

        this.get(url, function(response){
            callback(response);
        });
    }

    getTracks(callback){
        let url = this.baseUrl + '/users/' + window.user.id + '/tracks?limit=100&offset=0&client_id=' + this.clientID;

        this.get(url, function(response){
            callback(response);
        })
    }

    getStream(callback){
        let url = this.baseUrl + '/me/activities?limit=100&oauth_token=' + this.userToken.access_token;

        this.get(url, function(response){
            callback(response);
        });
    }
}