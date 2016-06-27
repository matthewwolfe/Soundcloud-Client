import React from 'react';

import MenuItem from './menuItem.jsx';

class TrackMenu extends React.Component {

    constructor(props){
        super(props);
    }

    toggleLike(){
        window.soundCloudAPI.toggleLikedTrack(this.props.track.id);
    }

    toggleRepost(){
        window.soundCloudAPI.toggleRepostTrack(this.props.track.id);
    }

    render(){
        return (
            <ul className="context-menu-list">
                <li className="list-item" onClick={this.toggleLike.bind(this)}>Like</li>
                <li className="list-item" onClick={this.toggleRepost.bind(this)}>Repost</li>
                <li className="list-item">Add to playlist</li>
            </ul>
        );
    }
}

export default TrackMenu;