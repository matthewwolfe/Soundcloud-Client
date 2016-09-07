import {
    HIDE_DOWNLOADER,
    START_DOWNLOAD_TRACK,
    FINISH_DOWNLOAD_TRACK,
    UPDATE_DOWNLOAD_TRACK_PROGRESS
} from '../actions/downloader';


const initialState = {
    track: {
        title: '',
        user: {
            username: ''
        }
    },
    progress: 0,
    hidden: true
};

function downloader(state = initialState, action){

    switch(action.type){

        case HIDE_DOWNLOADER:
            return Object.assign({},state, {
                hidden: true
            });

        case START_DOWNLOAD_TRACK:
            return Object.assign({}, state, {
                track: action.track,
                progress: 0,
                hidden: false
            });

        case FINISH_DOWNLOAD_TRACK:
            return Object.assign({}, state, {
                progress: 100
            });

        case UPDATE_DOWNLOAD_TRACK_PROGRESS:
            return Object.assign({}, state, {
                progress: action.progress
            });

        default:
            return state;
    }
}

export default downloader;