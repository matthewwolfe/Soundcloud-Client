import { TOGGLE_LIKE_TRACK } from '../actions/likedTrackIds';

const initialState = [];

function likedTrackIds(state = initialState, action){
    switch(action.type){

        case TOGGLE_LIKE_TRACK:
            // if the track has already been liked
            if(state.indexOf(action.id) !== -1){
                return state.filter((element) => element !== action.id);
            } else {
                return [action.id, ...state];
            }

        default:
            return state;
    }
}

export default likedTrackIds;