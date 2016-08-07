import { ADD_PLAYLISTS } from '../actions/playlists';

const initialState = [];

function playlist(state, action){
    switch(action.type){
        default:
            return state;
    }
}

function playlists(state = initialState, action){
    switch(action.type){

        case ADD_PLAYLISTS:
            return [
                ...state,
                ...action.playlists
            ];

        default:
            return state;
    }
}

export default playlists;