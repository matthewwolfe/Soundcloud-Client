import * as queue from './queue';
import { store } from '../../index.jsx';

import { setQueue } from '../../actions/queue';
import { updatePosition, updateDuration } from '../../actions/player';

/*
 * Variables
 */

let playerState = {
    id: null,
    position: null,
    isPlaying: false,
    volume: 50
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
    if(result.length === 1){
        return result[0];
    } else {
        return undefined;
    }
}

export function play(track){
    if(!isPlayerReady){
        return;
    }

    let tracks = Array.from(document.querySelectorAll('#music-list .track')).map((element) => parseInt(element.id));
    store.dispatch(setQueue(tracks));

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
        },

        whileplaying: function(){
            store.dispatch(updatePosition(this.position));
        },
        
        onfinish: function(){
            playNext();
        }
    });
}

function stop(){
    soundManager.stopAll();
    reset();
}

function playNext(){
    if(queue.length > 1){
        shiftQueue();

        play(queue[0]);
    }
}

function pause(){
    if(currentlyPlaying !== null){
        if(currentlyPlaying.isPlaying){
            currentlyPlaying.isPlaying = false;
            soundManager.pauseAll();
        }
    }
}

function resume(){
    if(currentlyPlaying !== null){
        if(!currentlyPlaying.isPlaying){
            if(currentSoundObject !== null){
                currentSoundObject.resume();
            }
        }
    }
}

function setPosition(newPosition){
    if(playerState.id !== null && playerState.isPlaying){
        soundManager.setPosition(currentSoundObject.id, newPosition);
    }
}

function toggleRepeat(){
    isRepeating = !isRepeating;
}

function toggleShuffle(){
    isShuffle = !isShuffle;
}

function setVolume(volume){
    soundManager.setVolume(volume);
}

function reset(){
    if(currentSoundObject !== null){
        currentSoundObject.clearOnPosition();
    }
    currentSoundObject = null;
}

/*
 * Internal functions
 */

function convertDuration(millis){
    var hours = Math.floor(millis / 36e5),
        mins = Math.floor((millis % 36e5) / 6e4),
        secs = Math.floor((millis % 6e4) / 1000); 
    return (hours > 0 ? hours + ":" : '') + (mins < 10 && hours > 0 ? '0' : '') + mins + ":" + (secs < 10 ? '0' : '') + secs;
}