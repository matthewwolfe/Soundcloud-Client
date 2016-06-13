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
    }

    play(track, onStartPlaying, onFinished){
        if(!this.isPlayerReady){
            return;
        }

        soundManager.stopAll();
        this.reset();

        this.currentSoundObject = soundManager.createSound({
            id: track.id,
            url: 'https://api.soundcloud.com/tracks/' + track.id + '/stream?client_id=173bf9df509c48cf53b70c83eaf5cbbd',
            title: track.title,
            volume: 50
        });

        this.setCurrentlyPlaying(track, onStartPlaying, onFinished);

        let self = this;

        this.currentSoundObject.play({
            onplay: function(){
                self.currentlyPlaying.isPlaying = true;
                self.currentlyPlaying.onStartPlaying();
                window.messenger.publish('music-position-update', {position: this.position, duration: this.duration});
            },
            whileplaying: function(){
                window.messenger.publish('music-position-update', {position: this.position, duration: this.duration});
            },
            onfinish: function(){
                if(self.isRepeating){
                    self.play(track, onStartPlaying, onFinished);
                } else {
                    self.currentlyPlaying.onFinished();
                }
            }
        });
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

    toggleRepeat(){
        this.isRepeating = !this.isRepeating;
    }

    toggleShuffle(){
        this.isShuffle = !this.isShuffle;
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
}