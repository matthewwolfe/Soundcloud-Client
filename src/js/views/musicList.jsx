import React from 'react';

class MusicList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: {
                tracks: []
            },
            selected: 'stream',
            isTiledView: false
        };

        this.trackId = 0;

        this.toggleViewSubscription = window.messenger.subscribe('music-list-toggle-view', function(data){
            this.setState({isTiledView: data.isTiledView});
        }.bind(this));

        // set up the listener
        this.sideMenuClickSubscription = window.messenger.subscribe('side-menu-click', function(data){
            this.setActive(data);
        }.bind(this));

        this.searchResultsSubscription = window.messenger.subscribe('search-results', function(data){
            this.setState({data: data});
        }.bind(this));
    }

    componentDidMount(){
        // initialize the selected view
        this.setActive({selected: 'stream'});
    }

    componentWillUnmount(){
        this.toggleViewSubscription.remove();
        this.sideMenuClickSubscription.remove();
        this.searchResultsSubscription.remove();
    }

    componentWillUpdate(nextProps, nextState){
        if(this.state.data.tracks !== nextState.data.tracks){
            window.music.setTracks(nextState.data.tracks);
        }
    }

    getStream(){
        window.soundCloudAPI.getStream(function(tracks){
            this.setState({data: {tracks: tracks}});
        }.bind(this));
    }

    getLikes(){
        window.soundCloudAPI.getLikedTracks(function(tracks){
            this.setState({data: {tracks: tracks}});
        }.bind(this));
    }

    getTracks(){
        window.soundCloudAPI.getMyTracks(function(tracks){
            this.setState({data: {tracks: tracks}});
        }.bind(this));
    }

    getPlaylist(id){
        window.soundCloudAPI.getPlaylist(
            id,
            function(tracks){
                this.setState({data: {tracks: tracks}});
            }.bind(this)
        );
    }

    ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setActive(data){
        this.setState({selected: data.selected});

        if(data.selected === 'stream'){
            this.getStream();
        } else if(data.selected === 'likes'){
            this.getLikes();
        } else if(data.selected === 'tracks'){
            this.getTracks();
        } else if(data.selected.indexOf('playlist') !== -1){
            // passes in the id because the string is "playlist-{id}"
            this.getPlaylist(data.selected.substring(data.selected.indexOf('-') + 1));
        }
    }

    render () {
        return (
            <div id="music-list">
            </div>
        );
    }
}

export default MusicList;