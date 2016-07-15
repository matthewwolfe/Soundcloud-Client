import React from 'react';

import Track from '../generic/track.jsx';

class ListTrack extends Track {

    constructor(props){
        super(props);
    }

    // Override
    render(){
        if(!this.state.liked && this.state.section === 'likes'){
            return null;
        }

        let trackClass = 'track list';
        let likedClass = 'glyphicon glyphicon-heart';
        let downloadClass = 'glyphicon glyphicon-download-alt';
        let options = '';

        if(this.state.playing){
            trackClass += ' playing';
        }

        if(this.state.liked){
            likedClass += ' liked';
        }

        if(!this.props.data.streamable){
            downloadClass += ' hide';
        }

        if(this.props.data.type !== 'offline'){
            
            options = <td className="track-options">
                        <span onClick={this.toggleLikedTrack.bind(this)} className={likedClass}></span>
                        <span onClick={this.downloadTrack.bind(this)} className={downloadClass}></span>
                      </td>
        }

        return (
            <tr className={trackClass} 
                id={this.props.data.id}
                onDoubleClick={this.playTrack.bind(this, this.props)}
                onContextMenu={this.contextMenu.bind(this)}>

                <td className="track-title">
                    <p>{this.props.data.title}</p>
                </td>
                <td className="track-user-username">
                    <p>{this.props.data.user.username}</p>
                </td>
                <td className="track-duration">
                    <p>{this.convertDuration(this.props.data.duration)}</p>
                </td>

                {options}
            </tr>
        );
    }
}

export default ListTrack;