import { getUserById } from '../core/soundcloud/soundCloudSDK';

/*
 * Action types
 */
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

/*
 * Action creators
 */
export function addUser(user){
    return {type: ADD_USER, user: user};
}

export function removeUser(id){
    return {type: REMOVE_USER, id: id};
}

export function getUser(id){

    return function(dispatch, getState){
        if(shouldFetchUser(getState(), id)){
            return dispatch(fetchUser(id));
        }
    }
}

function shouldFetchUser(state, id){
    let users = state.users;

    for(var i = 0; i < users.length; i++){
        if(users[i].id === id){
            return false;
        }
    }

    return true;
}

function fetchUser(id){
    return function(dispatch){
        getUserById(id, function(user){
            dispatch(addUser(user));
        });
    }
}