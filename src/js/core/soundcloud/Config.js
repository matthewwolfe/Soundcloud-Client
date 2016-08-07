// soundcloud
export const base_url = 'https://api.soundcloud.com';
export const base_urlv2 = 'https://api-v2.soundcloud.com';
export const redirect_uri = 'my-app://callback.html';
export const client_id = '173bf9df509c48cf53b70c83eaf5cbbd';
export const client_secret = '7ddbd6fcdc2d313abfb65758c751486e';
export const connection_url = 'https://api.soundcloud.com/connect?client_id=173bf9df509c48cf53b70c83eaf5cbbd&redirect_uri=my-app%3A%2F%2Fcallback.html&response_type=code';

// other stuff
export const music_download_path = `${node.electron.remote.app.getPath('appData')}/Soundcloud-Client/music`;

// soundcloud SDK url building
export const soundcloud_urls = {
    me: {
        base: '/me',
        params: [
            'oauth_token'
        ],
        next_href: null
    },

    stream: {
        base: '/me/activities',
        params: [
            'limit',
            'oauth_token'
        ],
        next_href: null,
        callback: function(response, callback){
            let activities = response.collection;
            let tracks = [];

            activities.forEach(function(activity){
                if(activity.origin !== null){
                    if(activity.origin.kind === 'track'){
                        tracks.push(activity.origin);
                    }
                }
            });

            config.soundcloud_urls['stream'].next_href = response.next_href;
            window.dataManager.concat('stream', tracks);

            callback(tracks);
        }
    },

    user_by_id: {
        base: function(user_id){
            return `/users/${user_id}`;
        },
        params: [
            'client_id'
        ],
        next_href: null
    },

    // Playlists
    playlists: {
        base: function(user_id){
            return `/users/${user_id}/playlists/liked_and_owned`;
        },
        params: [
            'oauth_token'
        ],
        next_href: null
    },

    playlist: {
        base: function(id){
            return `/playlists/${id}`;
        },
        params: [
            'client_id'
        ],
        next_href: null
    },

    tracks_by_ids: {
        base: '/tracks',
        params: [
            'ids',
            'client_id'
        ],
        next_href: null
    },

    // Tracks
    my_tracks: {
        base: '/me/tracks',
        params: [
            'limit',
            'offset',
            'oauth_token'
        ],
        next_href: null
    },

    // Likes
    liked_tracks: {
        base: function(user_id){
            return `/users/${user_id}/likes`;
        },
        params: [
            'limit',
            'offset',
            'linked_partitioning',
            'oauth_token'    
        ],
        next_href: null,
        callback: function(response, callback){
            let tracks = [];

            response.collection.forEach(function(element){
                if(element.track !== undefined){
                    tracks.push(element.track);
                }
            });

            config.soundcloud_urls['liked_tracks'].next_href = response.next_href;
            window.dataManager.concat('liked_tracks', tracks);

            callback(tracks);
        }
    },

    liked_track_ids: {
        base: '/e1/me/track_likes/ids',
        params: [
            'oauth_token',
            'limit',
            'linked_partitioning',
            'page_number',
            'page_size'
        ],
        next_href: null
    },

    track_repost_ids: {
        base: '/e1/me/track_reposts/ids',
        params: [
            'oauth_token',
            'limit',
            'linked_partitioning',
            'page_number',
            'page_size'
        ],
        next_href: null
    },

    top_50: {
        base: '/charts',
        params: [
            'kind',
            'genre',
            'client_id',
            'limit',
            'offset',
            'linked_partitioning'
        ],
        next_href: null
    },

    // Search
    search: {
        base: '/search/tracks',
        params: [
            'q',
            'facet',
            'limit',
            'client_id',
            'linked_partitioning'
        ],
        next_href: null
    },

    autocomplete: {
        base: '/search/autocomplete',
        params: [
            'q',
            'queries_limit',
            'results_limit',
            'client_id',
            'limit',
            'offset',
            'linked_partitioning'
        ],
        next_href: null
    },

    // Notifications
    notifications: {
        base: '/activities',
        params: [
            'limit',
            'offset',
            'linked_partitioning',
            'oauth_token'
        ],
        next_href: null
    }
};

export const soundcloud_storage = {
    likes: 'liked_tracks',
    stream: 'stream'
};