/*
 * Action types
 */
export const ADD_PLAYLISTS = 'ADD_PLAYLISTS';

/*
 * Action creators
 */
export function addPlaylists(playlists){
    return {type: ADD_PLAYLISTS, playlists: playlists};
}