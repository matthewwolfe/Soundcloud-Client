import React from 'react';

class MusicList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: {
                tracks: []
            },
            selected: 'stream'
        };

        this.trackId = 0;
    }

    componentDidMount(){
        // initialize the selected view
        this.setActive({selected: 'stream'});

        // set up the listener
        this.sideMenuClickSubscription = window.messenger.subscribe('side-menu-click', function(data){
            this.setActive(data);
        }.bind(this));

        this.searchResultsSubscription = window.messenger.subscribe('search-results', function(data){
            this.setState({data: data});
        }.bind(this));

        this.topSectionSubscription = window.messenger.subscribe('top-section-change', function(data){
            this.getTop50(data.kind, data.genre);
        }.bind(this));

        this.updateTrackListSubscription = window.messenger.subscribe('music-list-update-music-track-list', function(data){
            window.music.setTracks(this.state.data.tracks);
        }.bind(this));
    }

    componentWillUnmount(){
        this.sideMenuClickSubscription.remove();
        this.searchResultsSubscription.remove();
        this.topSectionSubscription.remove();
        this.updateTrackListSubscription.remove();
    }

    handleScroll(){
        let div = document.getElementById('music-list');

        if ((window.innerHeight + div.scrollTop) >= div.scrollHeight) {
            if(this.state.selected === 'stream' || this.state.selected === 'likes'){

                window.soundCloudAPI.getPagination(this.state.selected, function(tracks){
                    this.setState({data: {
                        tracks: this.state.data.tracks.concat(tracks)
                    }},
                    function(){
                        window.messenger.publish('music-list-update-music-track-list', {});
                    });
                }.bind(this));
            }
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

    getTop50(kind, genre){
        if(kind === undefined){
            kind = 'top';
        }
        if(genre === undefined){
            genre = 'all-music';
        }

        window.soundCloudAPI.getTop50(kind, genre, function(tracks){
            this.setState({data: {tracks: tracks}});
        }.bind(this));
    }

    ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setActive(data){
        this.setState({selected: data.selected});

        if(data.selected === 'top 50'){
            this.getTop50();
        } else if(data.selected === 'stream'){
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