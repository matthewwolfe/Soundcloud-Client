/*
 * Action types
 */
export const SET_QUEUE = 'SET_QUEUE';

/*
 * Action creators
 */

export function setQueue(tracks){
    return {type: SET_QUEUE, tracks: tracks};
}