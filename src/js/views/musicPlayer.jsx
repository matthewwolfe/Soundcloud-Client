import React from 'react';

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

        if(this.state.playing){
            playClass += ' hide';
        } else {
            pauseClass += 'hide';
        }

        return (
            <div id="music-player">
                <span id="play-button" onClick={this.play.bind(this)} className={playClass}></span>
                <span id="pause-button" onClick={this.pause.bind(this)} className={pauseClass}></span>
            </div>
        );
    }
}

export default MusicPlayer;