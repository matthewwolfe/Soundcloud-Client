import { TOGGLE_REPOST_TRACK } from '../actions/repostedTrackIds';

const initialState = [];

export function repostedTrackIds(state = initialState, action){
    switch(action.type){
        
        case TOGGLE_REPOST_TRACK:
            // if the track has already been liked
            if(state.indexOf(action.id) !== -1){
                return state.filter((element) => element !== action.id);
            } else {
                return state.concat([action.id]);
            }

        default:
            return state;
    }
}