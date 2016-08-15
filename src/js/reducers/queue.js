import {
    SET_QUEUE,
    SHIFT_QUEUE,
    REMOVE_FROM_QUEUE
} from '../actions/queue';

let initialState = [];

function setQueue(tracks){
    return [
        ...tracks
    ];
}

function shiftQueue(state){
    if(state.length >= 2){
        return state.slice(1);
    } else {
        return [];
    }
}

function removeFromQueue(state, id, index){
    if(state[index] !== id){
        return state;
    }

    return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
    ];
}

function queue(state = initialState, action){
    switch(action.type){

        case SET_QUEUE:
            return setQueue(action.tracks);

        case SHIFT_QUEUE:
            return shiftQueue(state);

        case REMOVE_FROM_QUEUE:
            return removeFromQueue(state, action.id, action.index);

        default:
            return state;
    }
}

export default queue;