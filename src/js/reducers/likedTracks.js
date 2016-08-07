import { LIKE_TRACK } from '../actions/likedTracks';

const initialState = {
    likedTracks: [],
    likedTrackIds: []
};

function likedTrack(state, action){

}

function likedTracks(state = initialState, action){
    switch(action.type){
        default:
            return state;
    }
}

export default likedTracks;