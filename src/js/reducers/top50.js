import { SET_TOP_50 } from '../actions/top50';

const initialState = {
    top50: [],
    type: 'top',
    genre: 'all-music'
};

function top50(state = initialState, action){

    switch(action.type){

        case SET_TOP_50:
            return Object.assign({}, state, {
                top50: action.tracks
            });

        default:
            return state;
    }
}

export default top50;