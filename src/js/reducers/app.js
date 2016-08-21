// Redux
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import user from './user';
import users from './users';
import top50 from './top50';
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
import search from './search';

const reducers = combineReducers({
    user: user,
    users: users,
    top50: top50,
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
    search: search,

    routing: routerReducer
});

export default reducers;