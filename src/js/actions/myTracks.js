/*
 * Action types
 */
export const ADD_MY_TRACK = 'ADD_MY_TRACK';
export const REMOVE_MY_TRACK = 'REMOVE_MY_TRACK';

/*
 * Action creators
 */
export function addMyTrack(id){
    return {action: ADD_MY_TRACK, id: id};
}

export function removeMyTrack(id){
    return {action: REMOVE_MY_TRACK, id: id};
}