/*
 * Action types
 */
export const TOGGLE_REPOST_TRACK = 'TOGGLE_REPOST_TRACK';

/*
 * Action creators
 */
function toggleRepostTrack(id){
	return {type: TOGGLE_REPOST_TRACK, id};
}