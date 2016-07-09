import React from 'react';
import {render} from 'react-dom';

import User from './user.jsx';
import SideMenu from './sideMenu.jsx';
import SearchBar from './searchBar.jsx';
import ListMusicList from './tracks_list/listMusicList.jsx';
import TiledMusicList from './tracks_tiled/tiledMusicList.jsx';
import MusicPlayer from './music_player/musicPlayer.jsx';
import TrackController from './trackController.jsx';

import QueueList from './queue/queueList.jsx';

import SettingsPage from './settings/settingsPage.jsx';
import DownloadPopup from './track_downloads/downloadPopup.jsx';
import ContextMenu from './context_menu/contextMenu.jsx';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isTiledView: false
        };
    }

    componentWillMount(){
        this.toggleViewSubscription = window.messenger.subscribe('music-list-toggle-view', function(data){
            this.setState({isTiledView: data.isTiledView});
        }.bind(this));
    }

    componentWillUnmount(){
        this.toggleViewSubscription.remove();
    }

    render () {
        let musicListView = <ListMusicList />;

        if(this.state.isTiledView){
            musicListView = <TiledMusicList />;
        }

        return (
            <div>
                <SearchBar />

                <div id="left-side-bar">
                    <User />
                    <SideMenu />
                    <TrackController />
                </div>

                {musicListView}

                <MusicPlayer />

                <QueueList />

                <SettingsPage />
                <DownloadPopup />
                <ContextMenu />
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
    window.soundCloudAPI = new SoundcloudSDK(function(){
        render(<App/>, document.getElementById('app'));
    });
});