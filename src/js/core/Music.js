class Music {

    constructor(){
        let that = this;

        soundManager.setup({
            url: '/path/to/swf-files/',
            flashVersion: 9, // optional: shiny features (default = 8)
            // optional: ignore Flash where possible, use 100% HTML5 mode
            // preferFlash: false,
            onready: function() {
                // Everything is loaded and ready
                that.isPlayerReady = true;
            }
        });

        this.currentlyPlaying = null;
        this.currentSoundObject = null;
    }

    play(track, onStartPlaying, onFinished){
        if(!this.isPlayerReady){
            return;
        }

        soundManager.stopAll();
        this.reset();

        this.currentSoundObject = soundManager.createSound({
            id: track.id,
            url: track.stream_url + '?client_id=173bf9df509c48cf53b70c83eaf5cbbd',
            title: track.title,
            volume: 50
        });

        this.setCurrentlyPlaying(track, onStartPlaying, onFinished);

        let that = this;

        this.currentSoundObject.play({
            onplay: function(){
                that.currentlyPlaying.isPlaying = true;
                that.currentlyPlaying.onStartPlaying();
            },
            onfinish: function(){
                that.currentlyPlaying.onFinished();
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

    reset(){
        if(this.currentSoundObject !== null){
            this.currentSoundObject.clearOnPosition();
        }
        this.currentSoundObject = null;
        this.currentlyPlaying = null;
    }
}