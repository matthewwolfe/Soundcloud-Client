import React from 'react';

class Track extends React.Component {

    constructor(props){
        super(props);

        this.state = {data: {},
                      playing: false};

        let that = this;

        window.messenger.subscribe('music-play-track', function(data){
            if(data.id.toString() === that.props.data.id.toString()){
                that.playTrack(that.props);
            }
        });

        window.messenger.subscribe('music-state-change', function(data){
            if(data.playing &&
               data.id.toString() === that.props.data.id.toString()
            ){
                that.setState({playing: true});
            } else {
                that.setState({playing: false});
            }
        });
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

    convertDuration(millis){
        var hours = Math.floor(millis / 36e5),
            mins = Math.floor((millis % 36e5) / 6e4),
            secs = Math.floor((millis % 6e4) / 1000); 
        return (hours > 0 ? hours + ":" : '') + (mins < 10 && hours > 0 ? '0' : '') + mins + ":" + (secs < 10 ? '0' : '') + secs;
    }

    render () {
        var trackClass = 'track';

        if(this.state.playing){
            trackClass += ' playing';
        }

        return (
            <tr className={trackClass} id={this.props.data.id} onDoubleClick={this.playTrack.bind(this, this.props)}>
                <td className="track-title"><p>{this.props.data.title}</p></td>
                <td className="track-user-username"><p>{this.props.data.user.username}</p></td>
                <td className="track-duration"><p>{this.convertDuration(this.props.data.duration)}</p></td>
            </tr>
        );
    }
}

export default Track;