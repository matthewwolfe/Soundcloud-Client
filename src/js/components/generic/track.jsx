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