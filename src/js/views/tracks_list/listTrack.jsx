import React from 'react';

import Track from '../track.jsx';

class ListTrack extends Track {

    constructor(props){
        super(props);
    }

    // Override
    render(){
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

export default ListTrack;