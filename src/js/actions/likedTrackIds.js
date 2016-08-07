/*
 * Action types
 */
export const TOGGLE_LIKE_TRACK = 'TOGGLE_LIKE_TRACK';

/*
 * Action creators
 */
function toggleLikeTrack(id){
 	return {type: TOGGLE_LIKE_TRACK, id};
}