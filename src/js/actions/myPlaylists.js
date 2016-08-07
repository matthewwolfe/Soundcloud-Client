/*
 * Action types
 */
export const ADD_MY_PLAYLIST = 'ADD_MY_PLAYLIST';
export const REMOVE_MY_PLAYLIST = 'REMOVE_MY_PLAYLIST';

/*
 * Action creators
 */
export function addMyPlaylist(id){
    return {action: ADD_MY_PLAYLIST, id: id};
}

export function removeMyPlaylist(id){
    return {action: REMOVE_MY_PLAYLIST: id, id};
}