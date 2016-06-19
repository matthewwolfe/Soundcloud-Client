import React from 'react';
import {render} from 'react-dom';

import User from './user.jsx';
import SideMenu from './sideMenu.jsx';
import SearchBar from './searchBar.jsx';
import ListMusicList from './tracks_list/listMusicList.jsx';
import TiledMusicList from './tracks_tiled/tiledMusicList.jsx';
import MusicPlayer from './musicPlayer.jsx';
import TrackController from './trackController.jsx';

class App extends React.Component {

    render () {
        return (
            <div>
                <SearchBar />

                <div id="left-side-bar">
                    <User />
                    <SideMenu />
                    <TrackController />
                </div>

                <ListMusicList />
                <TiledMusicList />

                <MusicPlayer />
            </div>
        );
    }
}

window.dataManager = new DataManager();

// initialize the publish/subscribe messenger
window.messenger = new Messenger();

// Initialize the music handler
window.music = new Music();

window.storageManager = new StorageManager(function(){
    // Initialize the connection to the SoundCloud API and then render the app
    window.soundCloudAPI = new SoundcloudAPI(function(){
        render(<App/>, document.getElementById('app'));
    });
});