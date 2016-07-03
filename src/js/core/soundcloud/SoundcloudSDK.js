class SoundcloudSDK {

    constructor(callback){
        this.baseUrl = 'https://api.soundcloud.com';
        this.baseUrlV2 = 'https://api-v2.soundcloud.com';

        this.request = new Request();

        this.oauthToken = new OAuthToken(function(){
            this.initializeApp(callback);
        }.bind(this));

        this.isPaginationRequestActive = false;
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

    // Private
    getMe(callback){
        let url = this.build_url('me', {}, {
            oauth_token: this.oauthToken.get('access_token')
        });

        this.request.get(this.baseUrlV2 + url, function(response){
            callback(response);
        });
    }

    getLikedTracks(callback){
        let likedTracks = window.dataManager.get('likedTracks');

        if(likedTracks){
            callback(likedTracks);
            return;
        }

        let url = this.build_url('liked_tracks', {user_id: window.user.id}, {
            oauth_token: this.oauthToken.get('access_token'),
        });

        let url = `/users/${window.user.id}/favorites?limit=100&offset=0&client_id=${config.client_id}`;

        this.request.get(this.baseUrl + url, function(likedTracks){
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
            url = this.baseUrl + this.build_url('liked_track_ids', {}, {
                oauth_token: this.oauthToken.get('access_token'),
                limit: 500,
                linked_partitioning: 1,
                page_number: 0,
                page_size: 200
            });
        }

        this.request.get(url, function(response){

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
            url = `${this.baseUrl}/e1/me/track_reposts/ids?oauth_token=${this.oauthToken.get('access_token')}&limit=5000&linked_partitioning=1&page_number=0&page_size=200`;
        }

        this.request.get(url, function(response){

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

        let url = '/users/' + window.user.id + '/tracks?limit=100&offset=0&client_id=' + config.client_id;

        this.request.get(this.baseUrl + url, function(myTracks){
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

        let url = `/me/activities?limit=100&oauth_token=${this.oauthToken.get('access_token')}`;

        this.request.get(this.baseUrl + url, function(response){
            
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
        let url = `/users/${window.user.id}/playlists/liked_and_owned?oauth_token=${this.oauthToken.get('access_token')}`;

        this.request.get(this.baseUrlV2 + url, function(response){
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
        let url = '/playlists/' + id + '?client_id=' + config.client_id;

        this.request.get(this.baseUrlV2 + url, function(response){
            callback(response.tracks);
        });
    }

    search(query, callback){
        let url = '/search?limit=100&q=' + query + '&client_id=' + config.client_id;

        this.request.get(this.baseUrlV2 + url, function(response){
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
        let url = '/users/' + window.user.id + '/favorites/' + id + '?oauth_token=' + this.oauthToken.get('access_token');

        if(window.dataManager.find('likedTrackIds', id)){
            this.request.delete(this.baseUrl + url, function(response){});
            window.dataManager.remove('likedTrackIds', id);

        } else {
            this.request.put(this.baseUrl + url, function(response){});
            window.dataManager.push('likedTrackIds', id);
        }

    }

    toggleRepostTrack(id, callback){
        let url = '/e1/me/track_reposts/' + id + '?oauth_token=' + this.oauthToken.get('access_token');

        if(window.dataManager.find('trackRepostIds', id)){
            this.request.delete(this.baseUrlV2 + url, function(response){});
            window.dataManager.remove('trackRepostIds', id);
        
        } else {
            this.request.put(this.baseUrlV2 + url, function(response){});
            window.dataManager.push('trackRepostIds', id);
        }
    }

    getTop50(kind, genre, callback){
        genre = 'soundcloud:genres:' + genre;

        let url = '/charts?' +
                    'kind=' + kind +
                    '&genre=' + genre +
                    '&client_id=' + config.client_id +
                    '&limit=200&offset=0&linked_partitioning=1';

        this.request.get(this.baseUrlV2 + url, function(response){
            let tracks = [];

            response.collection.forEach(function(element){
                tracks.push(element.track);
            });

            callback(tracks);
        });
    }

    getActivities(callback){
        let url = '/activities?limit=5&offset=0' +
                    '&linked_partitioning=1&oauth_token=' + this.oauthToken.get('access_token');

        this.request.get(this.baseUrlV2 + url, function(response){
            callback(response.collection);
        });
    }

    getPagination(type, callback){
        if(this.isPaginationRequestActive){
            return;
        }

        this.isPaginationRequestActive = true;

        // generate the offset for the query
        let offset, url;

        if(type === 'likes'){
            offset = window.dataManager.get('likedTracks').length;
            url = '/users/' + window.user.id + '/favorites?limit=100&offset=' + offset + '&client_id=' + config.client_id;
        } else if(type === 'stream'){
            offset = window.dataManager.get('stream').length;
            url = '/me/activities?limit=100&oauth_token=' + this.oauthToken.get('access_token');
        }

        this.request.get(this.baseUrlV2 + url, function(response){
            if(type === 'likes'){
                window.dataManager.concat('likedTracks', response);
            }

            callback(response);
            this.isPaginationRequestActive = false;
        }.bind(this));
    }

    build_url(type, base_function_params, params){
        if(!this.test_params(type, params)){
            console.error('Error building url: Mismatched parameters')
        }

        let url;

        if(Object.keys(base_function_params).length > 0){
            url = config.soundcloud_urls[type].base.apply(null, Array.prototype.slice.call(base_function_params)) + '?';
        } else {
            url = config.soundcloud_urls[type].base + '?';
        }

        for(let key in params){
            url += `${key}=${params[key]}&`;
        }

        return url;
    }

    test_params(type, params){
        if(Object.keys(params).length !== config.soundcloud_urls[type].params.length){
            return false;
        }

        for(let key in params){
            if(config.soundcloud_urls[type].params.indexOf(key) === -1){
                return false;
            }
        }

        return true;
    }
}