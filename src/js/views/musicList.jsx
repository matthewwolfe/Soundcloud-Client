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

        window.soundCloudAPI.getStream(function(tracks){
            that.setState({data: {tracks: tracks}});
        });
    }

    getLikes(){
        let that = this;

        window.soundCloudAPI.getLikedTracks(function(tracks){
            that.setState({data: {tracks: tracks}});
        });
    }

    getTracks(){
        let that = this;

        window.soundCloudAPI.getTracks(function(tracks){
            that.setState({data: {tracks: tracks}});
        });
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