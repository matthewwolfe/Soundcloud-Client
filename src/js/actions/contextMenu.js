/*
 * Action types
 */
export const CONTEXT_MENU_SHOW = 'CONTEXT_MENU_SHOW';
export const CONTEXT_MENU_HIDE = 'CONTEXT_MENU_HIDE';
export const INITIALIZE_CONTEXT_MENU = 'INITIALIZE_CONTEXT_MENU';

/*
 * Action creators
 */

export function showMenu(){
    return {type: CONTEXT_MENU_SHOW};
}

export function hideMenu(){
    return {type: CONTEXT_MENU_HIDE};
}

export function initializeMenu(type, data, coordinates){
    return {
        type: INITIALIZE_CONTEXT_MENU,
        menu_type: type,
        data: data,
        coordinates: coordinates
    };
}