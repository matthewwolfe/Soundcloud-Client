import { TOGGLE_LIKE_TRACK } from '../actions/likedTrackIds';

const initialState = [];

export function likedTrackIds(state = initialState, action){
    switch(action.type){

        case TOGGLE_LIKE_TRACK:
            // if the track has already been liked
            if(state.indexOf(action.id) !== -1){
                return state.filter((element) => element !== action.id);
            } else {
                return state.concat([action.id])
            }

        default:
            return state;
    }
}