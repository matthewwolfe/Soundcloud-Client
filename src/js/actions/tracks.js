/*
 * Action types
 */
export const PLAY_TRACK = 'PLAY_TRACK';

/*
 * Action creators
 */

 export function playTrack(id){
    return {type: PLAY_TRACK, id};
 }