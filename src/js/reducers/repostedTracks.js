import { REPOST_TRACK } from '../actions/repostedTracks';

const initialState = {
    repostedTracks: [],
    repostedTrackIds: []
};

function repostedTrack(state, action){

}

function repostedTracks(state = initialState, action){
    switch(action.type){
        default:
            return state;
    }
}

export default repostedTracks;