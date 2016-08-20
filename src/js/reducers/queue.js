import {
    SET_QUEUE,
    SHIFT_QUEUE,
    REMOVE_FROM_QUEUE,
    QUEUE_TOGGLE_HIDDEN
} from '../actions/queue';

let initialState = {
    queue: [],
    hidden: true
};

function setQueue(state, tracks){
    return Object.assign({}, state, {
        queue: [
            ...tracks
        ]
    });
}

function shiftQueue(state){
    let nextState = [];

    if(state.queue.length >= 2){
        nextState = state.queue.slice(1);
    }

    return Object.assign({}, state, {
        queue: nextState
    });
}

function removeFromQueue(state, id, index){
    if(state[index] !== id){
        return state;
    }

    return Object.assign({}, state, {
        queue: [
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ]
    });
}

function toggleHidden(state, hidden){
    return Object.assign({}, state, {
        hidden: !hidden
    });
}

function queue(state = initialState, action){
    switch(action.type){
        case SET_QUEUE:
            return setQueue(state, action.tracks);

        case SHIFT_QUEUE:
            return shiftQueue(state);

        case REMOVE_FROM_QUEUE:
            return removeFromQueue(state, action.id, action.index);

        case QUEUE_TOGGLE_HIDDEN:
            return toggleHidden(state, state.hidden);

        default:
            return state;
    }
}

export default queue;
