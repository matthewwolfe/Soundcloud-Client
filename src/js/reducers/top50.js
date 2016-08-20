import { SET_TOP_50, SET_TOP_50_KIND, SET_TOP_50_GENRE } from '../actions/top50';

const initialState = {
    top50: [],
    kind: 'top',
    genre: 'all-music'
};

function top50(state = initialState, action){

    switch(action.type){

        case SET_TOP_50:
            return Object.assign({}, state, {
                top50: action.tracks
            });

        case SET_TOP_50_KIND:
            return Object.assign({}, state, {
                kind: action.kind
            });

        case SET_TOP_50_GENRE:
            return Object.assign({}, state, {
                genre: action.genre
            });

        default:
            return state;
    }
}

export default top50;