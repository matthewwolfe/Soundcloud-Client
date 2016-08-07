import { ADD_MY_TRACK, REMOVE_MY_TRACK } from '../actions/myTracks';

const initialState = [];

function myTracks(state = initialState, action){
    switch(action.type){

        case ADD_MY_TRACK:
            return [
                ...state,
                action.id
            ];

        case REMOVE_MY_TRACK:
            return state.filter((trackID) => trackID !== action.id);

        default:
            return state;
    }
}

export default myTracks;