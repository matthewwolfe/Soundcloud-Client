import { 
    PLAY_TRACK,
    PAUSE_TRACK,
    PLAY_NEXT_TRACK,
    UPDATE_POSITION,
    UPDATE_DURATION

} from '../actions/player';

const initialState = {
    id: null,
    position: null,
    isPlaying: false
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

function updatePosition(state, action){
    return Object.assign({}, state, {
        position: action.position
    });
}

function player(state = initialState, action){

    switch(action.type){

        case PLAY_TRACK:
            return playTrack(state, action);

        case PAUSE_TRACK:
            return pauseTrack(state);

        case PLAY_NEXT_TRACK:
            return state;

        case UPDATE_POSITION:
            return updatePosition(state, action);

        default:
            return state;
    }
}

export default player;