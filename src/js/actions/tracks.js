/*
 * Action types
 */
export const PLAY_TRACK = 'PLAY_TRACK';
export const ADD_TRACKS = 'ADD_TRACKS';

/*
 * Action creators
 */

export function playTrack(id){
    return {type: PLAY_TRACK, id};
}

export function addTracks(tracks){
	return {type: ADD_TRACKS, tracks};
}