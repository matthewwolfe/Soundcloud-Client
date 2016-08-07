import { ADD_USER, REMOVE_USER } from '../actions/users';

const initialState = [];

export function users(state = initialState, action){
    switch(action.type){

        case ADD_USER:
            return [
                ...state,
                action.user
            ];

        case REMOVE_USER:
            return state.filter((user) => user.id !== action.id);

        default:
            return state;
    }
}