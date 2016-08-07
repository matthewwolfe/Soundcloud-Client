import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import tracks from './tracks';
import user from './user';
import likedTracks from './likedTracks';
import repostedTracks from './repostedTracks';

const reducers = combineReducers({
	user,
    tracks,
    likedTracks,
    repostedTracks,
    routing: routerReducer
});

export default reducers;