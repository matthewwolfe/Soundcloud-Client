class SoundcloudAPI extends Core {

    constructor(callback){
        super();

        this.clientID = '173bf9df509c48cf53b70c83eaf5cbbd';
        this.clientSecret = '7ddbd6fcdc2d313abfb65758c751486e';
        this.baseUrl = 'https://api.soundcloud.com';

        let that = this;

        // get the auth code or prompt the user to authorize the application
        this.getAuthCode(function(response){

            that.userAuthCode = response;

            // get the token
            that.getToken(function(response){
                that.userToken = response;
                
                // start rendering the view by getting the user
                that.getMe(function(response){
                    window.user = response;

                    callback();
                });
            });
        });
    }

    getAuthCode(callback){
        let url = window.location.href;
        let authCode = url.substring(url.indexOf('=') + 1);

        // the user has already authorized the application
        if(url.indexOf('=') !== -1){
            callback(authCode);

        // if we don't yet have the authentication code, then the user needs to connect and authorize the application
        } else {
            window.location.href = 'https://api.soundcloud.com/connect?client_id=173bf9df509c48cf53b70c83eaf5cbbd&redirect_uri=my-app%3A%2F%2Fcallback.html&response_type=code';
        }
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
            window.storageManager.set('token', response);
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