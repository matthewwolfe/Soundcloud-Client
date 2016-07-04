import React from 'react';

import VolumeControl from './volumeControl.jsx';
import MusicPlayerProgressBar from './musicPlayerProgressBar.jsx';

class MusicPlayer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            isRepeating: false,
            isShuffle: false,
            isTiledView: false
        };

        this.playPauseSubscription = window.messenger.subscribe('click-play-pause', function(data){
            if(this.state.playing){
                this.pause();
            } else {
                this.play();
            }
        }.bind(this));

        this.musicStateChangeSubscription = window.messenger.subscribe('music-state-change', function(data){
            this.setState({playing: data.playing});
        }.bind(this));
    }

    componentWillUnmount(){
        this.playPauseSubscription.remove();
        this.musicStateChangeSubscription.remove();
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

    toggleRepeat(){
        window.music.toggleRepeat();
        this.setState({isRepeating: window.music.isRepeating});
    }

    toggleShuffle(){
        window.music.toggleShuffle();
        this.setState({isShuffle: window.music.isShuffle});
    }

    toggleTiledView(e){
        let tiledView = !this.state.isTiledView;

        this.setState({isTiledView: tiledView});
        window.messenger.publish('music-list-toggle-view', {isTiledView: tiledView});
    }

    render () {
        var playClass = 'glyphicon glyphicon-play';
        var pauseClass = 'glyphicon glyphicon-pause';
        var repeatClass = 'glyphicon glyphicon-retweet pull-right';
        var shuffleClass = 'glyphicon glyphicon-random pull-right';
        var tiledClass = 'glyphicon glyphicon-th pull-right';

        var trackName = '';

        if(this.state.playing){
            playClass += ' hide';
        } else {
            pauseClass += ' hide';
        }

        if(this.state.isRepeating){
            repeatClass += ' active';
        }

        if(this.state.isShuffle){
            shuffleClass += ' active';
        }

        if(this.state.isTiledView){
            tiledClass += ' active';
        }

        if(window.music.currentlyPlaying !== null){
            trackName = window.music.currentlyPlaying.title;
        }

        return (
            <div id="music-player">
                <span id="play-button"
                      onClick={this.play.bind(this)}
                      className={playClass}>
                </span>

                <span id="pause-button"
                      onClick={this.pause.bind(this)}
                      className={pauseClass}>
                </span>

                <span id="volume-control"
                      className="glyphicon glyphicon-volume-up">
                </span>
                <VolumeControl />

                <MusicPlayerProgressBar />

                <span id="random-button"
                      className={shuffleClass}
                      onClick={this.toggleShuffle.bind(this)}>
                </span>

                <span id="repeat-button"
                      className={repeatClass}
                      onClick={this.toggleRepeat.bind(this)}>
                </span>

                <span id="tile-view-button"
                      className={tiledClass}
                      onClick={this.toggleTiledView.bind(this)}>
                </span>
            </div>
        );
    }
}

export default MusicPlayer;