class SoundcloudAPI extends Core {

    constructor(callback){
        super();

        // called when the logout button is clicked
        window.messenger.subscribe('logout', function(data){
            this.logout();
        }.bind(this));

        this.authenticationURL = 'https://api.soundcloud.com/connect?client_id=173bf9df509c48cf53b70c83eaf5cbbd&redirect_uri=my-app%3A%2F%2Fcallback.html&response_type=code';

        this.clientID = '173bf9df509c48cf53b70c83eaf5cbbd';
        this.clientSecret = '7ddbd6fcdc2d313abfb65758c751486e';
        this.baseUrl = 'https://api.soundcloud.com';
        this.v2BaseUrl = 'https://api-v2.soundcloud.com';

        // first try to get the user token from storage
        this.userToken = window.storageManager.get('token');

        // if the token doesn't exist then we need to authenticate the user
        if(this.userToken === null){

            // authenticate the user
            this.getAuthCode(function(response){
                this.userAuthCode = response;

                // get the initial token
                this.getToken('authorization', function(response){
                    this.userToken = response;
                    this.initializeApp(callback);

                }.bind(this));
            }.bind(this));
        } else {

            // if the token already exists, just refresh it
            this.getToken('refresh', function(response){
                this.userToken = response;
                this.initializeApp(callback);

            }.bind(this));
        }
    }

    initializeApp(callback){
        this.getMe(function(response){
            window.user = response;

            callback();
        });
    }

    logout(){
        window.storageManager.set('token', null);
        window.location.href = this.authenticationURL;
    }

    getAuthCode(callback){
        let url = window.location.href;
        let authCode = url.substring(url.indexOf('=') + 1);

        // the user has already authorized the application
        if(url.indexOf('=') !== -1){
            callback(authCode);

        // if we don't yet have the authentication code, then the user needs to connect and authorize the application
        } else {
            window.location.href = this.authenticationURL;
        }
    }

    getToken(type, callback){
        if(type === 'authorization'){
            this.exchangeToken(function(response){
                callback(response);
            });
        } else if(type === 'refresh'){
            this.refreshToken(function(response){
                callback(response);
            });
        }
    }

    exchangeToken(callback){
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

    refreshToken(callback){
        let url = this.baseUrl + '/oauth2/token';

        let data = {
            'client_id': this.clientID,
            'client_secret': this.clientSecret,
            'grant_type': 'refresh_token',
            'refresh_token': this.userToken.refresh_token
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
            
            let activities = response.collection;
            let tracks = [];

            activities.forEach(function(activity){
                if(activity.origin.kind === 'track'){
                    tracks.push(activity.origin);
                }
            });

            callback(tracks);
        });
    }

    getPlaylists(callback){
        let url = this.v2BaseUrl + '/users/' + window.user.id + '/playlists/liked_and_owned?oauth_token=' + this.userToken.access_token;

        this.get(url, function(response){
            callback(response);
        });
    }

    getOwnedPlaylists(callback){
        this.getPlaylists(function(response){
            let playlists = response.collection;
            let ownedPlaylists = [];

            playlists.forEach(function(playlist){
                if(playlist.type === 'playlist'){
                    ownedPlaylists.push(playlist);
                }
            });

            callback(ownedPlaylists);
        });
    }

    getLikedPlaylists(callback){
        this.getPlaylists(function(response){
            let playlists = response.collection;
            let likedPlaylists = [];

            playlists.forEach(function(playlist){
                if(playlist.type === 'playlist-like'){
                    likedPlaylists.push(playlist);
                }
            });

            callback(likedPlaylists);
        });
    }

    search(query, callback){
        let url = this.v2BaseUrl + '/search?limit=100&q=' + query + '&client_id=' + this.clientID;

        this.get(url, function(response){
            callback(response);
        });
    }
}