import { store } from '../../index.jsx';

import { setQueue, shiftQueue } from '../../actions/queue';
import { playTrack, updatePosition, updateDuration } from '../../actions/player';

/*
 * Variables
 */

let playerState = {
    id: null,
    position: null,
    isPlaying: false,
    volume: 50,
};

let currentSoundObject = null;

let isPlayerReady = false;
let isRepeating = false;
let isShuffle = false;

/*
 * External functions
 */

export function initialize(){
    soundManager.setup({
        url: '/path/to/swf-files/',
        flashVersion: 9, // optional: shiny features (default = 8)
        // optional: ignore Flash where possible, use 100% HTML5 mode
        // preferFlash: false,
        onready: function() {
            // Everything is loaded and ready
            isPlayerReady = true;
        }
    });
}

export function find(id){
    let result = store.getState().tracks.filter((track) => track.id === id);

    if(result.length){
        return result[0];
    } else {
        return undefined;
    }
}

/*
 * track - track object
 * index - index of the clicked on track, if applicable, otherwise undefined
 */
export function play(track){
    if(!isPlayerReady){
        return;
    }

    stop();

    // if the track id is undefined then it is an offline track
    if(track.hasOwnProperty('type') && track.type === 'offline'){
        currentSoundObject = soundManager.createSound({
            url: config.music_download_path + '/' + track.title + '.mp3',
            title: track.title,
            volume: 50
        });
    } else {
        currentSoundObject = soundManager.createSound({
            id: track.id,
            url: 'https://api.soundcloud.com/tracks/' + track.id + '/stream?client_id=173bf9df509c48cf53b70c83eaf5cbbd',
            title: track.title,
            volume: 50
        });
    }

    currentSoundObject.play({
        onplay: function(){
            store.dispatch(updateDuration(this.duration));
        },

        whileplaying: function(){
            store.dispatch(updatePosition(this.position));
        },

        onfinish: function(){
            playNext();
        }
    });
}

export function pause(){
    soundManager.pauseAll();
}

function stop(){
    soundManager.stopAll();
    reset();
}

export function playNext(){
    store.dispatch(shiftQueue());
    let queue = store.getState().queue.queue;

    if(queue.length){
        store.dispatch(playTrack(queue[0]));
    } 
}

export function resume(){
    currentSoundObject.resume();
}

export function setPosition(newPosition){
    soundManager.setPosition(currentSoundObject.id, newPosition);
}

function toggleRepeat(){
    isRepeating = !isRepeating;
}

function toggleShuffle(){
    isShuffle = !isShuffle;
}

export function setVolume(volume){
    soundManager.setVolume(volume);
}

function reset(){
    if(currentSoundObject !== null){
        currentSoundObject.clearOnPosition();
    }
    currentSoundObject = null;
}
