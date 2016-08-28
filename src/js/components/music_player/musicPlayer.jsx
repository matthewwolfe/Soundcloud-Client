import React from 'react';

import { connect } from 'react-redux';

import { toggleHidden } from '../../actions/queue';
import { resumeTrack, pauseTrack, updateVolume, updatePosition, toggleShuffle, toggleRepeat } from '../../actions/player';

import VolumeControl from './volumeControl.jsx';
import MusicPlayerProgressBar from './musicPlayerProgressBar.jsx';

const MusicPlayer = (props) => {

    var playClass = 'glyphicon glyphicon-play';
    var pauseClass = 'glyphicon glyphicon-pause';
    var repeatClass = 'glyphicon glyphicon-retweet pull-right';
    var shuffleClass = 'glyphicon glyphicon-random pull-right';
    var queueClass = 'glyphicon glyphicon-list pull-right';

    if(props.isPlaying){
        playClass += ' hide';
    } else {
        pauseClass += ' hide';
    }

    if(props.isRepeat){
        repeatClass += ' active';
    }

    if(props.isShuffle){
        shuffleClass += ' active';
    }

    if(!props.queueHidden){
        queueClass += ' active';
    }

    return (
        <div id="music-player">
            <span id="play-button"
                  onClick={props.resume}
                  className={playClass}>
            </span>

            <span id="pause-button"
                  onClick={props.pause}
                  className={pauseClass}>
            </span>

            <span id="volume-control"
                  className="glyphicon glyphicon-volume-up">
            </span>

            <VolumeControl setVolume={props.setVolume}
                           volume={props.volume} />

            {(props.currentlyPlaying) ? 
                <MusicPlayerProgressBar position={props.position}
                    track={props.currentlyPlaying}
                    isPlaying={props.isPlaying}
                    setPosition={props.setPosition} />
            : ''}

            <span id="queue-button"
                  className={queueClass}
                  onClick={props.toggleQueueHidden}>
            </span>

            <span id="random-button"
                  className={shuffleClass}
                  onClick={props.updateShuffle}>
            </span>

            <span id="repeat-button"
                  className={repeatClass}
                  onClick={props.updateRepeat}>
            </span>
        </div>
    );
}

const getCurrentlyPlaying = (isPlaying, tracks, track_id) => {
    if(track_id === null){
        return null;
    }

    return tracks.filter((track) => track.id === track_id)[0];
};

const mapStateToProps = (state) => {
    return {
        queueHidden: state.queue.hidden,
        isPlaying: state.player.isPlaying,
        isShuffle: state.player.isShuffle,
        isRepeat: state.player.isRepeat,
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
        },
        updateShuffle: () => {
            dispatch(toggleShuffle());
        },
        updateRepeat: () => {
            dispatch(toggleRepeat());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicPlayer);
