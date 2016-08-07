// Redux
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import user from './user';
import users from './users';
import stream from './stream';
import tracks from './tracks';
import myTracks from './myTracks';
import likedTrackIds from './likedTrackIds';
import repostedTrackIds from './repostedTrackIds';
import playlists from './playlists';
import likedPlaylists from './likedPlaylists';
import myPlaylists from './myPlaylists';

const reducers = combineReducers({
    user,
    users,
    stream,
    tracks,
    myTracks,
    likedTrackIds,
    repostedTrackIds,
    playlists,
    likedPlaylists,
    myPlaylists,

    routing: routerReducer
});

export default reducers;