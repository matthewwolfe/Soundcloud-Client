import * as request from './request';
import * as oauthToken from './oauthToken';
import * as config from './config';

import { store } from '../../index.jsx';

/*
 * Constants
 */
const baseURL = 'https://api.soundcloud.com';
const baseURLv2 = 'https://api-v2.soundcloud.com';

/*
 * Variables
 */
let userID;
let isPaginationRequestActive = false;

/*
 * Export functions
 */
export function initialize(callback){
    oauthToken.initialize(function(){
        initializeApp(callback);
    });
}


export function getMyTracks(callback){
    let url = build_url('my_tracks', {}, {
        limit: 100,
        offset: 0,
        oauth_token: oauthToken.get('access_token')
    });

    request.get(baseURL + url, function(myTracks){
        callback(myTracks);
    })
}

export function getStream(callback){
    let url = build_url('stream', {}, {
        limit: 100,
        oauth_token: oauthToken.get('access_token')
    });

    request.get(baseURL + url, function(stream){
        config.soundcloud_urls['stream'].callback(stream, callback);
    });
}

export function getUserById(id, callback){
    let url = build_url('user_by_id', {id: id}, {
        client_id: config.client_id
    });

    request.get(baseURL + url, function(user){
        callback(user);
    });
}

export function getLikedTracks(callback){
    let url = build_url('liked_tracks', {user_id: userID}, {
        limit: 100,
        offset: 0,
        linked_partitioning: 1,
        oauth_token: oauthToken.get('access_token'),
    });

    request.get(baseURLv2 + url, function(likedTracks){
        config.soundcloud_urls['liked_tracks'].callback(likedTracks, callback);
    });
}

function getPlaylists(callback){
    let url = build_url('playlists', {user_id: userID}, {
        oauth_token: oauthToken.get('access_token')
    });

    request.get(baseURLv2 + url, function(response){
        let count = response.collection.length;
        let numCompleted = 0;

        let playlists = [];

        response.collection.forEach((collection_item) => {
            let playlist = collection_item.playlist;
            playlist.type = collection_item.type;
            playlists.push(playlist);
        });

        playlists.forEach((playlist) => {

            getPlaylist(playlist.id, (playlist_tracks) => {
                playlist.tracks = playlist_tracks;
                numCompleted++;
                checkCompleted(count, numCompleted, playlists, callback);
            });
        });
    });

    function checkCompleted(count, numCompleted, playlists, callback){
        if(count === numCompleted){
            callback(playlists);
        }
    }
}

export function getOwnedPlaylists(callback){
    getPlaylists(function(playlists){
        let ownedPlaylists = [];

        playlists.forEach(function(playlist){
            if(playlist.type === 'playlist'){
                ownedPlaylists.push(playlist);
            }
        });

        callback(ownedPlaylists);
    });
}

export function getLikedPlaylists(callback){
    getPlaylists(function(playlists){
        let likedPlaylists = [];

        playlists.forEach(function(playlist){
            if(playlist.type === 'playlist-like'){
                likedPlaylists.push(playlist);
            }
        });

        callback(likedPlaylists);
    });
}

export function getPlaylist(id, callback){
    let url = build_url('playlist', {id: id}, {
        client_id: config.client_id
    });

    request.get(baseURLv2 + url, function(response){
        let trackIds = [];

        response.tracks.forEach(function(track){
            trackIds.push(track.id);
        });

        if(trackIds.length){
            getTracksByIds(trackIds, callback);
        } else {
            callback(trackIds);
        }
    });
}

function getTracksByIds(trackIds, callback){
    let url = build_url('tracks_by_ids', {}, {
        ids: trackIds.join(),
        client_id: config.client_id
    });

    request.get(baseURLv2 + url, function(response){
        callback(response);
    });
}

export function search(query, callback){
    let url = build_url('search', {}, {
        q: query,
        facet: 'genre',
        limit: 200,
        client_id: config.client_id,
        linked_partitioning: 1
    });

    request.get(baseURLv2 + url, function(response){
        let tracks = [];
        let track_ids = [];

        let store_tracks = store.getState().tracks;

        response.collection.forEach((track) => {
            if(track.kind === 'track'){
                // only add the track to the store if it isn't already there
                if(!store_tracks.filter((store_track) => store_track.id === track.id).length){
                    tracks.push(track);
                }
                track_ids.push(track.id);
            }
        });

        callback(tracks, track_ids);
    });
}

export function autocomplete(query, callback){
    let url = build_url('autocomplete', {}, {
        q: query,
        queries_limit: 0,
        results_limit: 20,
        client_id: config.client_id,
        limit: 20,
        offset: 0,
        linked_partitioning: 1
    });

    request.get(baseURLv2 + url, function(response){
        callback(response.results);
    });
}

export function likeTrack(id){
    let url = '/users/' + userID + '/favorites/' + id + '?oauth_token=' + oauthToken.get('access_token');
    request.put(baseURL + url, function(response){});
}

export function unlikeTrack(id){
    let url = '/users/' + userID + '/favorites/' + id + '?oauth_token=' + oauthToken.get('access_token');
    request.delete_request(baseURL + url, function(response){});
}

export function toggleRepostTrack(id, callback){
    let url = '/e1/me/track_reposts/' + id + '?oauth_token=' + oauthToken.get('access_token');

    request.delete_request(baseURLv2 + url, function(response){});
    request.put(baseURLv2 + url, function(response){});
}

export function getTop50(kind, genre, callback){
    genre = 'soundcloud:genres:' + genre;

    let url = build_url('top_50', {}, {
        kind: kind,
        genre: genre,
        client_id: config.client_id,
        limit: 200,
        offset: 0,
        linked_partitioning: 1
    });

    request.get(baseURLv2 + url, function(response){
        let tracks = [];
        let track_ids = [];

        let store_tracks = store.getState().tracks;

        response.collection.forEach((track) => {
            // only add the track to the store if it isn't already there
            if(!store_tracks.filter((store_track) => store_track.id === track.track.id).length){
                tracks.push(track.track);
            }
            track_ids.push(track.track.id);
        });

        callback(tracks, track_ids);
    });
}

export function getNotifications(callback){
    let url = build_url('notifications', {}, {
        limit: 5,
        offset: 0,
        linked_partitioning: 1,
        oauth_token: oauthToken.get('access_token')
    });

    request.get(baseURLv2 + url, function(response){
        callback(response.collection);
    });
}

export function getPagination(type, callback){
    if(isPaginationRequestActive){
        return;
    }

    isPaginationRequestActive = true;

    let key = key = config.soundcloud_storage[type],
        url = append_auth_info(config.soundcloud_urls[key].next_href);

    if(url.indexOf('null') !== -1){
        return;
    }

    request.get(url, function(response){
        if(config.soundcloud_urls[key].callback !== undefined){
            config.soundcloud_urls[key].callback(response, callback);
        } else {
            callback(response);
        }

        isPaginationRequestActive = false;
    });
}

function append_auth_info(url){
    return `${url}&client_id=${config.client_id}&oauth_token=${oauthToken.get('access_token')}`;
}

/*
 * Internal Functions
 */

function initializeApp(callback){
    let requestsRemaining = 8;

    let initialState = {
        user: {},
        users: [],
        stream: [],
        tracks: [],
        myTracks: [],
        likedTrackIds: [],
        repostedTrackIds: [],
        playlists: [],
        likedPlaylists: [],
        myPlaylists: [],
    };

    function requestsCompleteCheck(){
        requestsRemaining--;

        if(requestsRemaining === 0){
            callback(initialState);
        }
    }

    getMe(function(user){
        initialState.user = user;
        userID = user.id;
        requestsCompleteCheck();

        getStream(function(stream){
            stream.forEach((track) => {
                if(initialState.stream.indexOf(track.id) === -1){
                    initialState.stream.push(track.id);
                    initialState.tracks.push(track);
                }
            });

            requestsCompleteCheck();
        });

        getLikedTrackIds('', [], function(likedTrackIds){
            initialState.likedTrackIds = likedTrackIds;
            
            requestsCompleteCheck();
        });

        getTrackRepostIds('', [], function(repostedTrackIds){
            initialState.repostedTrackIds = repostedTrackIds;

            requestsCompleteCheck();
        });

        getLikedPlaylists(function(playlists){
            playlists.forEach((playlist) => {
                initialState.tracks = initialState.tracks.concat(playlist.tracks);
            });

            initialState.playlists = initialState.playlists.concat(playlists);
            initialState.likedPlaylists = playlists.map((playlist) => playlist.id);

            requestsCompleteCheck();
        });

        getOwnedPlaylists(function(playlists){
            playlists.forEach((playlist) => {
                initialState.tracks = initialState.tracks.concat(playlist.tracks);
            });
            
            initialState.playlists = initialState.playlists.concat(playlists);
            initialState.myPlaylists = playlists.map((playlist) => playlist.id);

            requestsCompleteCheck();
        });

        getMyTracks(function(tracks){
            initialState.tracks = initialState.tracks.concat(tracks);
            initialState.myTracks = tracks.map((track) => track.id);

            requestsCompleteCheck();
        });

        getLikedTracks(function(tracks){
            initialState.tracks = initialState.tracks.concat(tracks);

            requestsCompleteCheck();
        });
    });
}

function getMe(callback){
    let url = build_url('me', {}, {
        oauth_token: oauthToken.get('access_token')
    });

    request.get(baseURLv2 + url, function(response){
        callback(response);
    });
}

function getLikedTrackIds(url, array, callback){
    if(url.length === 0){
        url = baseURL + build_url('liked_track_ids', {}, {
            oauth_token: oauthToken.get('access_token'),
            limit: 500,
            linked_partitioning: 1,
            page_number: 0,
            page_size: 200
        });
    }

    request.get(url, function(response){

        if(response.collection.length > 0){
            for(var i = 0; i < response.collection.length; i++){
                array.push(response.collection[i]);
            }
        }

        if(response.hasOwnProperty('next_href')){
            getLikedTrackIds(response.next_href, array, callback);
        } else {
            callback(array);
        }
    });
}

function getTrackRepostIds(url, array, callback){
    if(url.length === 0){
        url = baseURL + build_url('track_repost_ids', {}, {
            oauth_token: oauthToken.get('access_token'),
            limit: 5000,
            linked_partitioning: 1,
            page_number: 0,
            page_size: 200
        });
    }

    request.get(url, function(response){

        if(response.collection.length > 0){
            for(var i = 0; i < response.collection.length; i++){
                array.push(response.collection[i]);
            }
        }

        if(response.hasOwnProperty('next_href')){
            getTrackRepostIds(response.next_href, array, callback);
        } else {
            callback(array);
        }
    });
}

/******** URL BUILDING ********/

function build_url(type, base_function_params, params){
    if(!test_params(type, params)){
        console.error('Error building url: Mismatched parameters')
    }

    let url;

    if(Object.keys(base_function_params).length > 0){
        url = generate_base_url(type, base_function_params) + '?';
    } else {
        url = config.soundcloud_urls[type].base + '?';
    }

    for(let key in params){
        url += `${key}=${params[key]}&`;
    }

    return url;
}

function generate_base_url(type, params){
    params = Object.keys(params).map(function (key) {return params[key]});
    return config.soundcloud_urls[type].base.apply(null, params);
}

function test_params(type, params){
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