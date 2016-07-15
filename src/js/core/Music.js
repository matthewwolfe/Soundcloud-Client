class Music {

    constructor(){
        let self = this;

        soundManager.setup({
            url: '/path/to/swf-files/',
            flashVersion: 9, // optional: shiny features (default = 8)
            // optional: ignore Flash where possible, use 100% HTML5 mode
            // preferFlash: false,
            onready: function() {
                // Everything is loaded and ready
                self.isPlayerReady = true;
            }
        });

        this.currentlyPlaying = null;
        this.currentSoundObject = null;

        this.isRepeating = false;
        this.isShuffle = false;

        this.queue = [];

        window.messenger.subscribe('click-next-track', function(data){
            if(this.currentlyPlaying !== null && this.currentlyPlaying.isPlaying){
                this.playNext();
            }
        }.bind(this));
    }



    play(track, onStartPlaying, onFinished){
        if(!this.isPlayerReady){
            return;
        }

        soundManager.stopAll();
        this.reset();

        // if the track id is undefined then it is an offline track
        if(track.hasOwnProperty('type') && track.type === 'offline'){
            this.currentSoundObject = soundManager.createSound({
                url: config.music_download_path + '/' + track.title + '.mp3',
                title: track.title,
                volume: 50
            });
        } else {
            this.currentSoundObject = soundManager.createSound({
                id: track.id,
                url: 'https://api.soundcloud.com/tracks/' + track.id + '/stream?client_id=173bf9df509c48cf53b70c83eaf5cbbd',
                title: track.title,
                volume: 50
            });
        }

        this.setCurrentlyPlaying(track, onStartPlaying, onFinished);

        let self = this;

        this.currentSoundObject.play({
            onplay: function(){
                self.currentlyPlaying.isPlaying = true;

                if(onStartPlaying != undefined){
                    self.currentlyPlaying.onStartPlaying();
                }

                window.messenger.publish('music-state-change', {playing: true, id: self.currentlyPlaying.track.id});
                window.messenger.publish('music-position-update', {position: this.position, duration: this.duration});
            },

            whileplaying: function(){
                window.messenger.publish('music-position-update', {position: this.position, duration: this.duration});
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

    playNext(onStartPlaying, onFinished){
        if(this.queue.length > 1){
            this.shiftQueue();

            this.play(this.queue[0], onStartPlaying, onFinished);
        }
    }

    pause(){
        if(this.currentlyPlaying !== null){
            if(this.currentlyPlaying.isPlaying){
                this.currentlyPlaying.isPlaying = false;
                soundManager.pauseAll();
                return true;
            }
        }

        return false;
    }

    resume(){
        if(this.currentlyPlaying !== null){
            if(!this.currentlyPlaying.isPlaying){
                if(this.currentSoundObject !== null){
                    this.currentlyPlaying.isPlaying = true;
                    this.currentSoundObject.resume();
                    return true;
                }
            }
        }

        return false;
    }

    setCurrentlyPlaying(track, onStartPlaying, onFinished){
        if(onStartPlaying === undefined){
            onStartPlaying = function(){};
        }

        if(onFinished === undefined){
            onFinished = function(){};
        }

        this.currentlyPlaying = {   
            track: track,
            onStartPlaying: onStartPlaying,
            onFinished: onFinished,
            isPlaying: false
        };
    }

    updatePosition(newPosition){
        if(this.currentlyPlaying !== null && this.currentlyPlaying.isPlaying){
            soundManager.setPosition(this.currentSoundObject.id, newPosition);

            window.messenger.publish(
                'music-position-update',
                {
                    position: this.currentSoundObject.position,
                    duration: this.currentSoundObject.duration
                }
            );
        }
    }

    toggleRepeat(){
        this.isRepeating = !this.isRepeating;
    }

    toggleShuffle(){
        this.isShuffle = !this.isShuffle;
        // send it to the set method for shuffling

        if(this.isShuffle){
            this.setQueue(this.queue);
        } else {
            // publishing this action will cause setQueue to be called with the
            // non-shuffled music list, as retrieved from the musicList component
            window.messenger.publish('music-list-update-music-track-list', {});
        }
    }

    setVolume(volume){
        soundManager.setVolume(volume);
    }

    reset(){
        if(this.currentSoundObject !== null){
            this.currentSoundObject.clearOnPosition();
        }
        this.currentSoundObject = null;
        this.currentlyPlaying = null;
    }

    convertDuration(millis){
        var hours = Math.floor(millis / 36e5),
            mins = Math.floor((millis % 36e5) / 6e4),
            secs = Math.floor((millis % 6e4) / 1000); 
        return (hours > 0 ? hours + ":" : '') + (mins < 10 && hours > 0 ? '0' : '') + mins + ":" + (secs < 10 ? '0' : '') + secs;
    }

    /* Queue Methods */

    setQueue(tracks){
        if(this.isShuffle){
            // removing the first element before shuffling and then adding it back
            // to the front ensures that the currently playing track remains #1
            let firstTrack = tracks.shift();
            this.shuffleQueue(tracks);
            tracks.unshift(firstTrack);
        }

        this.queue = tracks;
        window.messenger.publish('queue-order-updated', {tracks: this.queue});
    }

    getQueue(){
        return this.queue;
    }

    shiftQueue(){
        this.queue.shift();
        window.messenger.publish('queue-order-updated', {tracks: this.queue});
    }

    removeFromQueue(id, index){
        if(this.getQueue()[index].id === id){
            // if the currently playing song is removed from the queue,
            // the current song should be skipped
            if(this.currentlyPlaying !== null && this.currentlyPlaying.track.id === id){
                this.playNext();
            } else {
                this.getQueue().splice(index, 1);
                window.messenger.publish('queue-order-updated', {tracks: this.queue});
            }
        }
    }

    shuffleQueue(){
        var currentIndex = this.queue.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.queue[currentIndex];
            this.queue[currentIndex] = this.queue[randomIndex];
            this.queue[randomIndex] = temporaryValue;
        }
    }
}