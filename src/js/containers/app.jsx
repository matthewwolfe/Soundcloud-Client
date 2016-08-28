import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import User from '../components/user.jsx';
import SideMenu from '../components/sideMenu.jsx';
import SearchBar from '../components/search/searchBar.jsx';
import ListMusicList from '../components/tracks_list/listMusicList.jsx';
import VisibleMusicList from './visibleMusicList';
import MusicPlayer from '../components/music_player/musicPlayer.jsx';
import TrackController from '../components/trackController.jsx';

import QueueList from '../components/queue/queueList.jsx';

import DownloadPopup from '../components/track_downloads/downloadPopup.jsx';
import ContextMenu from '../components/context_menu/contextMenu.jsx';

const App = (props) => {

    return (
        <div>
            <SearchBar />

            <div id="left-side-bar">
                <User user={props.user} />
                <SideMenu />
                <TrackController />
            </div>

            <VisibleMusicList />

            <MusicPlayer />

            <QueueList />
            
            <DownloadPopup />
            <ContextMenu />
        </div>
    );
}

function mapStateToProps(state){
    const user = state.user;

    return {
        user
    };
}

export default connect(mapStateToProps)(App);