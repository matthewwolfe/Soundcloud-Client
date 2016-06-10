import React from 'react';

class TrackController extends React.Component {

    constructor(props){
        super(props);

        this.state = {track: {}};

        window.messenger.subscribe('music-state-change', function(data){
            this.setState({playing: data.playing});

            if(data.playing){
                this.setState({track: window.music.currentlyPlaying.track});
            }
        }.bind(this));
    }

    render () {
        if(this.state.playing){ 
            return (
                <div id="track-controller">
                    <img id="track-image" src={this.state.track.artwork_url} />
                    <div id="track-title">{this.state.track.title}</div>
                    <div id="track-creator">{this.state.track.user.username}</div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default TrackController;