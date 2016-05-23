import React from 'react';

import TrackController from './trackController.jsx';

class MusicPlayer extends React.Component {

    constructor(props){
        super(props);

        this.state = {data: {}};

        let that = this;

        window.messenger.subscribe('music-state-change', function(data){
            that.setState({playing: data.playing});
        });
    }

    play(){
        if(window.music.resume()){
            this.setState({playing: true});
        }
    }

    pause(){
        if(window.music.pause()){
            this.setState({playing: false});
        }
    }

    render () {
        var playClass = 'glyphicon glyphicon-play';
        var pauseClass = 'glyphicon glyphicon-pause';

        var trackName = "";

        if(this.state.playing){
            playClass += ' hide';
        } else {
            pauseClass += 'hide';
        }

        if(window.music.currentlyPlaying !== null){
            trackName = window.music.currentlyPlaying.title;
        }

        return (
            <div id="music-player">
                <span id="play-button" onClick={this.play.bind(this)} className={playClass}></span>
                <span id="pause-button" onClick={this.pause.bind(this)} className={pauseClass}></span>
                <span id="volume-control" className="glyphicon glyphicon-volume-up"></span>
                <TrackController />
                <span id="random-button" className="glyphicon glyphicon-random pull-right"></span>
                <span id="repeat-button" className="glyphicon glyphicon-retweet pull-right"></span>
            </div>
        );
    }
}

export default MusicPlayer;