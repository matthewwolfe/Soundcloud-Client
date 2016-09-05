import {
    INITIALIZE_CONTEXT_MENU,
    CONTEXT_MENU_HIDE,
    CONTEXT_MENU_SHOW
} from '../actions/contextMenu';

const initialState = {
    hidden: true,
    type: '',
    data: {},
    coordinates: {
        x: 0,
        y: 0
    }
};

function contextMenu(state = initialState, action){

    switch(action.type){

        case CONTEXT_MENU_HIDE:
            return Object.assign({}, state, {
                hidden: true
            });

        case CONTEXT_MENU_SHOW:
            return Object.assign({}, state, {
                hidden: false
            });

        case INITIALIZE_CONTEXT_MENU:
            return Object.assign({}, state, {
                type: action.menu_type,
                data: action.data,
                coordinates: action.coordinates
            });

        default:
            return state;
    }
}

export default contextMenu;