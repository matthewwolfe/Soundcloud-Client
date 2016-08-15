import { SET_QUEUE } from '../actions/queue';

let initialState = [];

function queue(state = initialState, action){
    switch(action.type){

        case SET_QUEUE:
            return [
                ...action.tracks
            ];

        default:
            return state;
    }
}

export default queue;