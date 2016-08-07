import { TOGGLE_LIKE_PLAYLIST } from '../actions/likedPlaylists';

const initialState = [];

export function likedPlaylists(state = initialState, actions){
    switch(action.type){

        case TOGGLE_LIKE_PLAYLIST:
            // if the playlist is already liked
            if(state.indexOf(id) !== -1){
                return state.filter((playlist) => playlist.id !== action.id);
            } else {
                return [
                    ...state,
                    action.id
                ];
            }

        default:
            return state;
    }
}