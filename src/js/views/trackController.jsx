import React from 'react';

class TrackController extends React.Component {

    constructor(props){
        super(props);

        this.state = {title: ''};

        let that = this;

        window.messenger.subscribe('music-state-change', function(data){
            that.setState({playing: data.playing});

            if(data.playing){
                that.setState({title: window.music.currentlyPlaying.title});
            }
        });
    }

    render () {
        var className  = "";

        if(!this.state.playing){
            className += 'hide';
        }

        return (
            <span id="track-controller" className={className}>
                <span id="track-title">
                    {this.state.title}
                </span>
            </span>
        );
    }
}

export default TrackController;