import { ADD_MY_PLAYLIST, REMOVE_MY_PLAYLIST } from '../actions/myPlaylists'; 

const initialState = [];

export function myPlaylists(state = initialState, action){
    switch(action.type){

        case ADD_MY_PLAYLIST:
            return [
                ...state,
                action.id
            ];

        case REMOVE_MY_PLAYLIST:
            return state.filter((playlistID) => playlistID !== action.id);

        default:
            return state;
    }
}