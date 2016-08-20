import { ADD_TRACKS } from '../actions/tracks';

const initialState = [];

function track(state, action){
    switch(action.type){
        default:
            return state;
    }
}

function tracks(state = initialState, action){
    switch(action.type){

        case ADD_TRACKS:
            return [
                ...state,
                ...action.tracks
            ];

        default:
            return state;
    }
}

export default tracks;