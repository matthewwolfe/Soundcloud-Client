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
        window.messenger.subscribe('side-menu-click', function(data){
            this.setActive(data);
        }.bind(this));

        window.messenger.subscribe('search-results', function(data){
            this.setState({data: data});
        }.bind(this));
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
        window.soundCloudAPI.getTracks(function(tracks){
            this.setState({data: {tracks: tracks}});
        }.bind(this));
    }

    getPlaylists(){

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
                <h2 className="section-title">{this.ucFirst(this.state.selected)}</h2>

                <table>
                    <tbody>
                        {tracks}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MusicList;