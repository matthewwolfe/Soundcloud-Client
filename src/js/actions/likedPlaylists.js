/*
 * Action types
 */
export const TOGGLE_LIKE_PLAYLIST = 'TOGGLE_LIKE_PLAYLIST';

/*
 * Action creators
 */
export function toggleLikePlaylist(id){
    return {action: TOGGLE_LIKE_PLAYLIST, id: id};
}