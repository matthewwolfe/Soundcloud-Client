import React from 'react';
import {render} from 'react-dom';

import User from './user.jsx';
import SideMenu from './sideMenu.jsx';
import MusicList from './musicList.jsx';
import MusicPlayer from './musicPlayer.jsx';
import TrackController from './trackController.jsx';

class App extends React.Component {

    render () {
        return (
            <div>
                <div id="left-side-bar">
                    <User />
                    <SideMenu />
                    <TrackController />
                </div>

                <MusicList />
                <MusicPlayer />
            </div>
        );
    }
}

window.storageManager = new StorageManager();

// initialize the publish/subscribe messenger
window.messenger = new Messenger();

// Initialize the music handler
window.music = new Music();

// Initialize the connection to the SoundCloud API and then render the app
window.soundCloudAPI = new SoundcloudAPI(function(){
    render(<App/>, document.getElementById('app'));
});