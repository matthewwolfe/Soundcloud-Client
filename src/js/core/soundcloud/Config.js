const config = {
    base_url: 'https://api.soundcloud.com',
    base_urlv2: 'https://api-v2.soundcloud.com',
    redirect_uri: 'my-app://callback.html',
    client_id: '173bf9df509c48cf53b70c83eaf5cbbd',
    client_secret: '7ddbd6fcdc2d313abfb65758c751486e',
    connection_url: 'https://api.soundcloud.com/connect?client_id=173bf9df509c48cf53b70c83eaf5cbbd&redirect_uri=my-app%3A%2F%2Fcallback.html&response_type=code'
};

config.soundcloud_urls = {
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
        base: '/me/favorites/ids',
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
        base: '/search',
        params: [
            'q',
            'client_id'
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

    // Toggling

};

config.soundcloud_storage = {
    likes: 'liked_tracks',
    stream: 'stream'
};