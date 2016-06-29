class SoundcloudAPI extends Core {

    constructor(callback){
        super();

        // called when the logout button is clicked
        window.messenger.subscribe('logout', function(data){
            this.logout();
        }.bind(this));

        // the connection link with the required redirect request
        // as specified by the soundcloud api
        this.authenticationURL = 'https://api.soundcloud.com/connect?'
                               + 'client_id=173bf9df509c48cf53b70c83eaf5cbbd&'
                               + 'redirect_uri=my-app%3A%2F%2Fcallback.html&response_type=code';

        this.clientID = '173bf9df509c48cf53b70c83eaf5cbbd';
        this.clientSecret = '7ddbd6fcdc2d313abfb65758c751486e';
        
        this.baseUrl = 'https://api.soundcloud.com';
        this.v2BaseUrl = 'https://api-v2.soundcloud.com';

        this.initializeToken(callback);
    }

    initializeToken(callback){
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

    // Private
    initializeApp(callback){
        this.getMe(function(response){
            window.user = response;

            this.getLikedTrackIds('', [], function(likedTrackIds){
                window.dataManager.set('likedTrackIds', likedTrackIds);

                this.getTrackRepostIds('', [], function(trackRepostIds){
                    window.dataManager.set('trackRepostIds', trackRepostIds);

                    callback();
                });

            }.bind(this));

        }.bind(this));
    }

    logout(){
        window.storageManager.set('token', null);
        window.location.href = this.authenticationURL;
    }

    // Private
    getAuthCode(callback){
        let url = window.location.href;
        let authCode = url.substring(url.indexOf('=') + 1);

        // the user has already authorized the application
        if(url.indexOf('=') !== -1){
            callback(authCode);

        // if we don't yet have the authentication code, 
        // then the user needs to connect and authorize the application
        } else {
            window.location.href = this.authenticationURL;
        }
    }

    // Private
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

    // Private
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

    // Private
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

    // Private
    getMe(callback){
        let url = this.baseUrl + '/me?oauth_token=' + this.userToken.access_token;

        this.get(url, function(response){
            callback(response);
        });
    }

    getLikedTracks(callback){
        let likedTracks = window.dataManager.get('likedTracks');

        if(likedTracks){
            callback(likedTracks);
            return;
        }

        let url = this.baseUrl + '/users/' + window.user.id + '/favorites?limit=100&offset=0&client_id=' + this.clientID;

        this.get(url, function(likedTracks){
            window.dataManager.set('likedTracks', likedTracks);
            callback(likedTracks);
        });
    }

    getLikedTrackIds(url, array, callback){
        let ids = window.dataManager.get('likedTrackIds');

        if(ids){
            callback(ids);
            return;
        }

        if(url.length === 0){
            url = this.baseUrl + '/me/favorites/ids?oauth_token=' + this.userToken.access_token +
                '&limit=5000&linked_partitioning=1&page_number=0&page_size=200';
        }

        this.get(url, function(response){

            if(response.collection.length > 0){
                for(var i = 0; i < response.collection.length; i++){
                    array.push(response.collection[i]);
                }
            }

            if(response.hasOwnProperty('next_href')){
                this.getLikedTrackIds(response.next_href, array, callback);
            } else {
                callback(array);
            }
        }.bind(this));
    }

    getTrackRepostIds(url, array, callback){
        let ids = window.dataManager.get('trackRepostIds');

        if(ids){
            callback(ids);
            return;
        }

        if(url.length === 0){
            url = this.baseUrl + '/e1/me/track_reposts/ids?oauth_token=' + this.userToken.access_token +
                '&limit=5000&linked_partitioning=1&page_number=0&page_size=200';
        }

        this.get(url, function(response){

            if(response.collection.length > 0){
                for(var i = 0; i < response.collection.length; i++){
                    array.push(response.collection[i]);
                }
            }

            if(response.hasOwnProperty('next_href')){
                this.getTrackRepostIds(response.next_href, array, callback);
            } else {
                callback(array);
            }
        }.bind(this));
    }

    getMyTracks(callback){
        let myTracks = window.dataManager.get('myTracks');

        if(myTracks){
            callback(myTracks);
            return;
        }

        let url = this.baseUrl + '/users/' + window.user.id + '/tracks?limit=100&offset=0&client_id=' + this.clientID;

        this.get(url, function(myTracks){
            window.dataManager.set('myTracks', myTracks);
            callback(myTracks);
        })
    }

    getStream(callback){
        let stream = window.dataManager.get('stream');

        if(stream){
            callback(stream);
            return;
        }

        let url = this.baseUrl + '/me/activities?limit=100&oauth_token=' + this.userToken.access_token;

        this.get(url, function(response){
            
            let activities = response.collection;
            let tracks = [];

            activities.forEach(function(activity){
                if(activity.origin !== null){
                    if(activity.origin.kind === 'track'){
                        tracks.push(activity.origin);
                    }
                }
            });

            window.dataManager.set('stream', tracks);

            callback(tracks);
        });
    }

    // Private
    getPlaylists(callback){
        let url = this.v2BaseUrl + '/users/' + window.user.id + '/playlists/liked_and_owned?oauth_token=' + this.userToken.access_token;

        this.get(url, function(response){
            callback(response);
        });
    }

    getOwnedPlaylists(callback){
        let ownedPlaylists = window.dataManager.get('ownedPlaylists');

        if(ownedPlaylists){
            callback(ownedPlaylists);
            return;
        }

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
        let likedPlaylists = window.dataManager.get('likedPlaylists');

        if(likedPlaylists){
            callback(likedPlaylists);
            return;
        }

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

    getPlaylist(id, callback){
        let url = this.baseUrl + '/playlists/' + id + '?client_id=' + this.clientID;

        this.get(url, function(response){
            callback(response.tracks);
        });
    }

    search(query, callback){
        let url = this.v2BaseUrl + '/search?limit=100&q=' + query + '&client_id=' + this.clientID;

        this.get(url, function(response){
            let collection = response.collection;
            let tracks = [];

            collection.forEach(function(element){
                if(element.kind === 'track'){
                    tracks.push(element);
                }
            });

            callback(tracks);
        });
    }

    toggleLikedTrack(id){
        let url = this.baseUrl + '/users/' + window.user.id + '/favorites/' + id + '?oauth_token=' + this.userToken.access_token;

        if(window.dataManager.find('likedTrackIds', id)){
            this.delete(url, function(response){});
            window.dataManager.remove('likedTrackIds', id);

        } else {
            this.put(url, function(response){});
            window.dataManager.push('likedTrackIds', id);
        }

    }

    toggleRepostTrack(id, callback){
        let url = this.baseUrl + '/e1/me/track_reposts/' + id + '?oauth_token=' + this.userToken.access_token;

        if(window.dataManager.find('trackRepostIds', id)){
            this.delete(url, function(response){});
            window.dataManager.remove('trackRepostIds', id);
        
        } else {
            this.put(url, function(response){});
            window.dataManager.push('trackRepostIds', id);
        }
    }

    getTop50(kind, genre, callback){
        genre = 'soundcloud:genres:' + genre;

        let url = this.v2BaseUrl + '/charts?' +
                    'kind=' + kind +
                    '&genre=' + genre +
                    '&client_id=' + this.clientID +
                    '&limit=200&offset=0&linked_partitioning=1';

        this.get(url, function(response){
            let tracks = [];

            response.collection.forEach(function(element){
                tracks.push(element.track);
            });

            callback(tracks);
        });
    }

    getActivities(callback){
        let url = this.v2BaseUrl + '/activities?limit=5&offset=0' +
                    '&linked_partitioning=1&oauth_token=' + this.userToken.access_token;

        this.get(url, function(response){
            callback(response.collection);
        });
    }
}