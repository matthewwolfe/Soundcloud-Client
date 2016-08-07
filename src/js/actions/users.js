/*
 * Action types
 */
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

/*
 * Action creators
 */
export function addUser(user){
    return {action: ADD_USER, user: user};
}

export function removeUser(id){
    return {action: REMOVE_USER, id: id};
}