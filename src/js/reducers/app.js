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

import section from './section';
import player from './player';
import queue from './queue';

const reducers = combineReducers({
    user: user,
    users: users,
    stream: stream,
    tracks: tracks,
    myTracks: myTracks,
    likedTrackIds: likedTrackIds,
    repostedTrackIds: repostedTrackIds,
    playlists: playlists,
    likedPlaylists: likedPlaylists,
    myPlaylists: myPlaylists,
    section: section,
    player: player,
    queue: queue,

    routing: routerReducer
});

export default reducers;