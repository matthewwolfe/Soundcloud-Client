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

    getMyTracks(callback){
        let myTracks = window.dataManager.get('myTracks');

        if(myTracks){
            callback(myTracks);
            return;
        }

        let url = this.build_url('my_tracks', {}, {
            limit: 100,
            offset: 0,
            oauth_token: this.oauthToken.get('access_token')
        });

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

        let url = this.build_url('stream', {}, {
            limit: 100,
            oauth_token: this.oauthToken.get('access_token')
        });

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

    getLikedTracks(callback){
        let liked_tracks = window.dataManager.get('liked_tracks');

        if(liked_tracks){
            callback(liked_tracks);
            return;
        }

        let url = this.build_url('liked_tracks', {user_id: window.user.id}, {
            limit: 100,
            offset: 0,
            linked_partitioning: 1,
            oauth_token: this.oauthToken.get('access_token'),
        });

        this.request.get(this.baseUrlV2 + url, function(response){
            if(config.soundcloud_urls['liked_tracks'].callback !== undefined){
                config.soundcloud_urls['liked_tracks'].callback(response, callback);
            } else {
                callback(response);
            }
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
            url = this.baseUrl + this.build_url('track_repost_ids', {}, {
                oauth_token: this.oauthToken.get('access_token'),
                limit: 5000,
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
                this.getTrackRepostIds(response.next_href, array, callback);
            } else {
                callback(array);
            }
        }.bind(this));
    }

    // Private
    getPlaylists(callback){
        let url = this.build_url('playlists', {user_id: window.user.id}, {
            oauth_token: this.oauthToken.get('access_token')
        });

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
        let url = this.build_url('playlist', {id: id}, {
            client_id: config.client_id
        });

        this.request.get(this.baseUrlV2 + url, function(response){
            callback(response.tracks);
        });
    }

    search(query, callback){
        let url = this.build_url('search', {}, {
            q: query,
            client_id: config.client_id
        });

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

        let url = this.build_url('top_50', {}, {
            kind: kind,
            genre: genre,
            client_id: config.client_id,
            limit: 200,
            offset: 0,
            linked_partitioning: 1
        });

        this.request.get(this.baseUrlV2 + url, function(response){
            let tracks = [];

            response.collection.forEach(function(element){
                tracks.push(element.track);
            });

            callback(tracks);
        });
    }

    getNotifications(callback){
        let url = this.build_url('notifications', {}, {
            limit: 5,
            offset: 0,
            linked_partitioning: 1,
            oauth_token: this.oauthToken.get('access_token')
        });

        this.request.get(this.baseUrlV2 + url, function(response){
            callback(response.collection);
        });
    }

    getPagination(type, callback){
        if(this.isPaginationRequestActive){
            return;
        }

        this.isPaginationRequestActive = true;

        let key = key = config.soundcloud_storage[type],
            url = this.append_client_id(config.soundcloud_urls[key].next_href);

        if(url.indexOf('null') !== -1){
            return;
        }

        this.request.get(url, function(response){
            if(config.soundcloud_urls[key].callback !== undefined){
                config.soundcloud_urls[key].callback(response, callback);
            } else {
                callback(response);
            }

            this.isPaginationRequestActive = false;
        }.bind(this));
    }

    append_client_id(url){
        return url + '&client_id=' + config.client_id;
    }

    /******** URL BUILDING ********/

    build_url(type, base_function_params, params){
        if(!this.test_params(type, params)){
            console.error('Error building url: Mismatched parameters')
        }

        let url;

        if(Object.keys(base_function_params).length > 0){
            url = this.generate_base_url(type, base_function_params) + '?';
        } else {
            url = config.soundcloud_urls[type].base + '?';
        }

        for(let key in params){
            url += `${key}=${params[key]}&`;
        }

        return url;
    }

    generate_base_url(type, params){
        params = Object.keys(params).map(function (key) {return params[key]});
        return config.soundcloud_urls[type].base.apply(null, params);
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