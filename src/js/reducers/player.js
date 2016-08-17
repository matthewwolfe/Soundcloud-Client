import {
    PLAY_TRACK,
    PAUSE_TRACK,
    RESUME_TRACK,
    PLAY_NEXT_TRACK,
    UPDATE_POSITION,
    UPDATE_DURATION,
    UPDATE_VOLUME
} from '../actions/player';

const initialState = {
    id: null,
    position: null,
    isPlaying: false,
    volume: 50
};

function playTrack(state, action){
    return Object.assign({}, state, {
        isPlaying: true,
        id: action.id,
        position: 0,
        duration: action.duration
    });
}

function pauseTrack(state){
    return Object.assign({}, state, {
        isPlaying: false
    });
}

function resumeTrack(state){
    return Object.assign({}, state, {
        isPlaying: true
    });
}

function updatePosition(state, action){
    return Object.assign({}, state, {
        position: action.position
    });
}

function updateVolume(state, volume){
    return Object.assign({}, state, {
        volume: volume
    });
}

function player(state = initialState, action){

    switch(action.type){

        case PLAY_TRACK:
            return playTrack(state, action);

        case PAUSE_TRACK:
            return pauseTrack(state);

        case RESUME_TRACK:
            return resumeTrack(state);

        case PLAY_NEXT_TRACK:
            return state;

        case UPDATE_POSITION:
            return updatePosition(state, action);

        case UPDATE_VOLUME:
            return updateVolume(state, action.volume);

        default:
            return state;
    }
}

export default player;
