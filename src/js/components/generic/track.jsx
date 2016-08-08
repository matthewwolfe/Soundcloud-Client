import React from 'react';

class Track extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidUpdate(){
        if(this.state.playing){
            window.messenger.publish('music-list-update-music-track-list', {});
        }
    }

    playTrack(props){
        window.music.play(
            props.data
        );
    }

    toggleLikedTrack(){
        window.soundCloudAPI.toggleLikedTrack(this.props.data);
        window.messenger.publish('track-like', {
            id: this.props.data.id,
            liked: !this.state.liked
        });
    }

    convertDuration(millis){
        var hours = Math.floor(millis / 36e5),
            mins = Math.floor((millis % 36e5) / 6e4),
            secs = Math.floor((millis % 6e4) / 1000); 
        return (hours > 0 ? hours + ":" : '') + (mins < 10 && hours > 0 ? '0' : '') + mins + ":" + (secs < 10 ? '0' : '') + secs;
    }

    contextMenu(e){
        if(this.props.data.type !== 'offline'){
            window.messenger.publish('context-menu-toggle',
                {
                    type: 'track',
                    data: this.props.data,
                    coordinates: {
                        x: e.pageX,
                        y: e.pageY
                    }
                }
            );
        }
    }


    downloadTrack(){
        window.messenger.publish('download-track-info', {track: this.props.data});
        window.downloader.downloadTrack(this.props.data);
    }

    render () {
        return null;
    }
}

export default Track;