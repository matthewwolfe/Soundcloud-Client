import * as player from '../core/music/player';

player.initialize();

/*
 * Action types
 */
export const PLAY_TRACK = 'PLAY_TRACK';
export const PAUSE_TRACK = 'PAUSE_TRACK';
export const PLAY_NEXT_TRACK = 'PLAY_NEXT_TRACK';
export const UPDATE_POSITION = 'UPDATE_POSITION';
export const UPDATE_DURATION = 'UPDATE_DURATION';

/*
 * Action creators
 */

export function playTrack(id){
    let track = player.find(id);
    player.play(track);
    
    return {type: PLAY_TRACK, id: id, duration: track.duration};
}

export function pauseTrack(){
    return {type: PAUSE_TRACK};
}

export function playNextTrack(){
    return {type: PLAY_NEXT_TRACK};
}

export function updatePosition(position){
    return {type: UPDATE_POSITION, position: position};
}

export function updateDuration(duration){
    return {type: UPDATE_DURATION, duration: duration};
}

export function updateVolume(volume){
    return {type: UPDATE_VOLUME, volume: volume};
}