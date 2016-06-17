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
        } else {
            this.state.liked = false;
        }

        if(window.music.currentlyPlaying !== null){
            if(window.music.currentlyPlaying.track.id === this.props.data.id){
                this.state.playing = true;
            }
        }

        this.musicPlayTrackSubscription = window.messenger.subscribe(
            'music-play-track',
            function(data){
                if(data.id.toString() === this.props.data.id.toString()){
                    this.playTrack(this.props);
                }
            }.bind(this)
        );

        this.musicStateSubscription = window.messenger.subscribe(
            'music-state-change',
            function(data){
                if(data.playing &&
                   data.id.toString() === this.props.data.id.toString()
                ){
                    this.setState({playing: true});
                } else {
                    this.setState({playing: false});
                }
            }.bind(this)
        );
    }

    componentWillUnmount(){
        this.musicStateSubscription.remove();
        this.musicPlayTrackSubscription.remove();
    }

    playTrack(props){

        window.music.play(
            props.data,

            // on start
            function(){
                window.messenger.publish('music-state-change', {playing: true, id: props.data.id});
            },

            // on finished
            function(){
                var trackElement = document.getElementById(props.data.id),
                    nextTrackElement = trackElement.nextSibling;

                if(nextTrackElement === null){
                    nextTrackElement = trackElement.parentElement.firstChild;
                }

                if(nextTrackElement.id === trackElement.id){
                    window.messenger.publish('music-state-change', {playing: false, id: props.data.id});
                } else {
                    window.messenger.publish('music-play-track', {id: nextTrackElement.id});
                }
            }
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

    render () {
        if(!this.state.liked && this.state.section === 'likes'){
            return null;
        }

        let trackClass = 'track';
        let likedClass = 'glyphicon glyphicon-heart';

        if(this.state.playing){
            trackClass += ' playing';
        }

        if(this.state.liked){
            likedClass += ' liked';
        }

        return (
            <tr className={trackClass} id={this.props.data.id} onDoubleClick={this.playTrack.bind(this, this.props)}>
                <td className="track-title">
                    <p>{this.props.data.title}</p>
                </td>
                <td className="track-user-username">
                    <p>{this.props.data.user.username}</p>
                </td>
                <td className="track-duration">
                    <p>{this.convertDuration(this.props.data.duration)}</p>
                </td>
                <td className="track-options">
                    <span onClick={this.toggleLikedTrack.bind(this)} className={likedClass}></span>
                </td>
            </tr>
        );
    }
}

export default Track;