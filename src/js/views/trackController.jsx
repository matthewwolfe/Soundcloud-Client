import React from 'react';

class TrackController extends React.Component {

    constructor(props){
        super(props);

        this.state = {track: {}};

        let that = this;

        window.messenger.subscribe('music-state-change', function(data){
            that.setState({playing: data.playing});

            if(data.playing){
                that.setState({track: window.music.currentlyPlaying.track});
            }
        });
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