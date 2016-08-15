/*
 * Action types
 */
export const SET_QUEUE = 'SET_QUEUE';
export const SHIFT_QUEUE = 'SHIFT_QUEUE';
export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE';

/*
 * Action creators
 */

export function setQueue(tracks){
    return {type: SET_QUEUE, tracks: tracks};
}

export function shiftQueue(){
    return {type: SHIFT_QUEUE};
}

export function removeFromQueue(id, index){
    return {type: REMOVE_FROM_QUEUE, id: id, index: index};
}