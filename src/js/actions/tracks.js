/*
 * Action types
 */
export const ADD_TRACKS = 'ADD_TRACKS';

/*
 * Action creators
 */

export function addTracks(tracks){
	return {type: ADD_TRACKS, tracks};
}