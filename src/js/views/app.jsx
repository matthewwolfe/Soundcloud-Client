import React from 'react';

import User from './user.jsx';
import SideMenu from './sideMenu.jsx';
import SearchBar from './search/searchBar.jsx';
import ListMusicList from './tracks_list/listMusicList.jsx';
import TiledMusicList from './tracks_tiled/tiledMusicList.jsx';
import MusicPlayer from './music_player/musicPlayer.jsx';
import TrackController from './trackController.jsx';

import QueueList from './queue/queueList.jsx';

import UserPage from './user/userPage.jsx';
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

        this.toggleHideSubscription = window.messenger.subscribe('splash-screen-hide', function(data){
            this.setState({hidden: false});
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

                <UserPage />
                <SettingsPage />
                <DownloadPopup />
                <ContextMenu />
            </div>
        );
    }
}

export default App;