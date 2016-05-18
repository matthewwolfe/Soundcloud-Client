import React from 'react';

import Track from './track.jsx';

class MusicList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: {
                tracks: []
            },
            selected: 'stream'
        };
    }

    componentDidMount(){
        // initialize the selected view
        this.setActive({selected: 'stream'});

        // set up the listener
        let that = this;

        window.messenger.subscribe('side-menu-click', function(data){
            that.setActive(data);
        });
    }

    getStream(){
        let that = this;

        window.soundCloudAPI.getTracks(function(tracks){
            that.setState({data: {tracks: tracks}});
        });
    }

    getLikes(){

    }

    getTracks(){

    }

    getPlaylists(){

    }

    setActive(data){
        this.setState({selected: data.selected});

        if(data.selected === 'stream'){
            this.getStream();
        } else if(data.selected === 'likes'){
            this.getLikes();
        } else if(data.selected === 'tracks'){
            this.getTracks();
        } else if(data.selected === 'playlists'){
            this.getPlaylists();
        }
    }

    render () {
        var tracks = [];

        for(var i = 0; i < this.state.data.tracks.length; i++){
            tracks.push(<Track data={this.state.data.tracks[i]} key={i} />);
        }

        return (
            <div id="music-list">
                {tracks}
            </div>
        );
    }
}

export default MusicList;