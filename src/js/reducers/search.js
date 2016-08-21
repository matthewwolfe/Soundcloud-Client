import { SET_SEARCH_RESULTS } from '../actions/search';

const initialState = [];

function search(state = initialState, action){

    switch(action.type){

        case SET_SEARCH_RESULTS:
            return [
                ...action.tracks
            ];

        default:
            return state;
    }
}

export default search;