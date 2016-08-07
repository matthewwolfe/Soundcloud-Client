/*
 * Variables
 */
let isPlayerReady;
let currentlyPlaying;
let currentSoundObject;
let isRepeating;
let isShuffle;
let queue;

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

    currentlyPlaying = null;
    currentSoundObject = null;

    isRepeating = false;
    isShuffle = false;

    queue = [];
}

function play(track, onStartPlaying, onFinished){
    if(!isPlayerReady){
        return;
    }

    soundManager.stopAll();
    reset();

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

    setCurrentlyPlaying(track, onStartPlaying, onFinished);

    let self = this;

    currentSoundObject.play({
        onplay: function(){
            self.currentlyPlaying.isPlaying = true;

            if(onStartPlaying != undefined){
                self.currentlyPlaying.onStartPlaying();
            }

            window.messenger.publish('music-state-change', {playing: true, id: self.currentlyPlaying.track.id});
            window.messenger.publish('music-position-update', {position: position, duration: duration});
        },

        whileplaying: function(){
            window.messenger.publish('music-position-update', {position: position, duration: duration});
        },
        
        onfinish: function(){
            if(self.isRepeating){
                self.play(track, onStartPlaying, onFinished);
            } else {
                if(onFinished !== undefined){
                    self.currentlyPlaying.onFinished();
                }

                self.playNext(onStartPlaying, onFinished);
            }
        }
    });
}

function playNext(onStartPlaying, onFinished){
    if(queue.length > 1){
        shiftQueue();

        play(queue[0], onStartPlaying, onFinished);
    }
}

function pause(){
    if(currentlyPlaying !== null){
        if(currentlyPlaying.isPlaying){
            currentlyPlaying.isPlaying = false;
            soundManager.pauseAll();
            return true;
        }
    }

    return false;
}

function resume(){
    if(currentlyPlaying !== null){
        if(!currentlyPlaying.isPlaying){
            if(currentSoundObject !== null){
                currentlyPlaying.isPlaying = true;
                currentSoundObject.resume();
                return true;
            }
        }
    }

    return false;
}

function setCurrentlyPlaying(track, onStartPlaying, onFinished){
    if(onStartPlaying === undefined){
        onStartPlaying = function(){};
    }

    if(onFinished === undefined){
        onFinished = function(){};
    }

    currentlyPlaying = {   
        track: track,
        onStartPlaying: onStartPlaying,
        onFinished: onFinished,
        isPlaying: false
    };
}

function updatePosition(newPosition){
    if(currentlyPlaying !== null && currentlyPlaying.isPlaying){
        soundManager.setPosition(currentSoundObject.id, newPosition);

        window.messenger.publish(
            'music-position-update',
            {
                position: currentSoundObject.position,
                duration: currentSoundObject.duration
            }
        );
    }
}

function toggleRepeat(){
    isRepeating = !isRepeating;
}

function toggleShuffle(){
    isShuffle = !isShuffle;
    // send it to the set method for shuffling

    if(isShuffle){
        setQueue(queue);
    } else {
        // publishing this action will cause setQueue to be called with the
        // non-shuffled music list, as retrieved from the musicList component
        window.messenger.publish('music-list-update-music-track-list', {});
    }
}

function setVolume(volume){
    soundManager.setVolume(volume);
}

function reset(){
    if(currentSoundObject !== null){
        currentSoundObject.clearOnPosition();
    }
    currentSoundObject = null;
    currentlyPlaying = null;
}

function convertDuration(millis){
    var hours = Math.floor(millis / 36e5),
        mins = Math.floor((millis % 36e5) / 6e4),
        secs = Math.floor((millis % 6e4) / 1000); 
    return (hours > 0 ? hours + ":" : '') + (mins < 10 && hours > 0 ? '0' : '') + mins + ":" + (secs < 10 ? '0' : '') + secs;
}

/* Queue Methods */

function setQueue(tracks){
    if(isShuffle){
        // removing the first element before shuffling and then adding it back
        // to the front ensures that the currently playing track remains #1
        let firstTrack = tracks.shift();
        shuffleQueue(tracks);
        tracks.unshift(firstTrack);
    }

    queue = tracks;
    window.messenger.publish('queue-order-updated', {tracks: queue});
}

function getQueue(){
    return queue;
}

function shiftQueue(){
    queue.shift();
    window.messenger.publish('queue-order-updated', {tracks: queue});
}

function removeFromQueue(id, index){
    if(getQueue()[index].id === id){
        // if the currently playing song is removed from the queue,
        // the current song should be skipped
        if(currentlyPlaying !== null && currentlyPlaying.track.id === id){
            playNext();
        } else {
            getQueue().splice(index, 1);
            window.messenger.publish('queue-order-updated', {tracks: queue});
        }
    }
}

function shuffleQueue(){
    var currentIndex = queue.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = queue[currentIndex];
        queue[currentIndex] = queue[randomIndex];
        queue[randomIndex] = temporaryValue;
    }
}