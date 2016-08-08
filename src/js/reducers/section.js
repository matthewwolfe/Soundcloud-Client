import { SET_SELECTED_SECTION } from '../actions/section';

const initialState = {
    selectedSection: 'stream'
};

function section(state = initialState, action){
    
    switch(action.type){

        case SET_SELECTED_SECTION:
            return Object.assign({}, state, {
                selectedSection: action.section
            });

        default:
            return state;
    }
}

export default section;