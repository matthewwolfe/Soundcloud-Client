import { PLAY_TRACK } from '../actions/tracks';

const initialState = [];

function track(state, action){
    switch(action.type){
        case PLAY_TRACK:
            if(state.id !== action.id){
                return Object.assign({}, state, {
                    isPlaying: false
                });
            }

            return Object.assign({}, state, {
                isPlaying: true
            });
        default:
            return state;
    }
}

function tracks(state = initialState, action){
    switch(action.type){
        case PLAY_TRACK:
            return state.map(single_track =>
                track(single_track, action)
            )
        default:
            return state;
    }
}

export default tracks;