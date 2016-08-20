import React from 'react';

import { connect } from 'react-redux';

import { toggleHidden } from '../../actions/queue';
import { resumeTrack, pauseTrack, updateVolume, updatePosition } from '../../actions/player';

import VolumeControl from './volumeControl.jsx';
import MusicPlayerProgressBar from './musicPlayerProgressBar.jsx';

class MusicPlayer extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isRepeating: false,
            isShuffle: false,
            isTiledView: false
        };
    }

    toggleRepeat(){
        this.setState({isRepeating: window.music.isRepeating});
    }

    toggleShuffle(){
        this.setState({isShuffle: window.music.isShuffle});
    }

    toggleTiledView(){
        this.setState({isTiledView: !this.state.isTiledView});
    }

    render () {
        var playClass = 'glyphicon glyphicon-play';
        var pauseClass = 'glyphicon glyphicon-pause';
        var repeatClass = 'glyphicon glyphicon-retweet pull-right';
        var shuffleClass = 'glyphicon glyphicon-random pull-right';
        var tiledClass = 'glyphicon glyphicon-th pull-right';
        var queueClass = 'glyphicon glyphicon-list pull-right';

        if(this.props.isPlaying){
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

        if(!this.props.queueHidden){
            queueClass += ' active';
        }

        return (
            <div id="music-player">
                <span id="play-button"
                      onClick={this.props.resume}
                      className={playClass}>
                </span>

                <span id="pause-button"
                      onClick={this.props.pause}
                      className={pauseClass}>
                </span>

                <span id="volume-control"
                      className="glyphicon glyphicon-volume-up">
                </span>

                <VolumeControl setVolume={this.props.setVolume}
                               volume={this.props.volume} />

                {(this.props.currentlyPlaying) ? 
                    <MusicPlayerProgressBar position={this.props.position}
                        track={this.props.currentlyPlaying}
                        isPlaying={this.props.isPlaying}
                        setPosition={this.props.setPosition} />
                : ''}

                <span id="queue-button"
                      className={queueClass}
                      onClick={this.props.toggleQueueHidden}>
                </span>

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

const getCurrentlyPlaying = (isPlaying, tracks, track_id) => {
    if(!isPlaying){
        return null;
    }

    return tracks.filter((track) => track.id === track_id)[0];
};

const mapStateToProps = (state) => {
    return {
        queueHidden: state.queue.hidden,
        isPlaying: state.player.isPlaying,
        volume: state.player.volume,
        position: state.player.position,
        currentlyPlaying: getCurrentlyPlaying(state.player.isPlaying, state.tracks, state.player.id),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resume: () => {
            dispatch(resumeTrack());
        },
        pause: () => {
            dispatch(pauseTrack());
        },
        toggleQueueHidden: () => {
            dispatch(toggleHidden());
        },
        setVolume: (volume) => {
            dispatch(updateVolume(volume));
        },
        setPosition: (position) => {
            dispatch(updatePosition(position, true));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicPlayer);
