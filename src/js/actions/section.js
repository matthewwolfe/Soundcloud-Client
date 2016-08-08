/*
 * Action types
 */
export const SET_SELECTED_SECTION = 'SET_SELECTED_SECTION';

/*
 * Action creators
 */
export function setSelectedSection(section){
    return {type: SET_SELECTED_SECTION, section: section};
}