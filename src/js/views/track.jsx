import React from 'react';

class Track extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            playing: false,
            section: this.props.section
        };

        if(window.dataManager.find('likedTrackIds', this.props.data.id)){
            this.state.liked = true;
        }

        if(window.music.currentlyPlaying !== null){
            if(window.music.currentlyPlaying.track.id === this.props.data.id){
                this.state.playing = true;
            }
        }

        this.musicStateSubscription = window.messenger.subscribe(
            'music-state-change',
            function(data){
                if(data.playing && data.id.toString() === this.props.data.id.toString()){
                    this.setState({playing: true});
                } else {
                    this.setState({playing: false});
                }
            }.bind(this)
        );
    }

    componentWillUnmount(){
        this.musicStateSubscription.remove();
    }

    playTrack(props){

        window.music.play(
            props.data
        );
    }

    toggleLikedTrack(){
        window.soundCloudAPI.toggleLikedTrack(this.props.data.id);
        this.setState({liked: !this.state.liked});
    }

    convertDuration(millis){
        var hours = Math.floor(millis / 36e5),
            mins = Math.floor((millis % 36e5) / 6e4),
            secs = Math.floor((millis % 6e4) / 1000); 
        return (hours > 0 ? hours + ":" : '') + (mins < 10 && hours > 0 ? '0' : '') + mins + ":" + (secs < 10 ? '0' : '') + secs;
    }

    contextMenu(e){
        window.messenger.publish('context-menu-toggle',
            {
                type: 'track',
                data: this.props.data,
                coordinates: {
                    x: e.pageX + 5,
                    y: e.pageY
                }
            }
        );
    }

    render () {
        return null;
    }
}

export default Track;