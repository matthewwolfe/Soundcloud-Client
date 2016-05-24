import React from 'react';

class TrackController extends React.Component {

    constructor(props){
        super(props);

        this.state = {title: '',
                      creator: '',
                      image: ''};

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
            <div id="track-controller" className={className}>
                <img id="track-image" src={this.state.image} />
                <h4 id="track-title">{this.state.title}</h4>
                <p id="track-creator">{this.state.creator}</p>
            </div>
        );
    }
}

export default TrackController;