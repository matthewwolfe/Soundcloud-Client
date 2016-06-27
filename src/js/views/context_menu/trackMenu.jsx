import React from 'react';

import MenuItem from './menuItem.jsx';

class TrackMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            liked: false
        };

        window.messenger.subscribe('track-like', function(data){
            if(data.id === this.props.track.id){
                this.setState({liked: data.liked});
            }
        }.bind(this));
    }

    componentWillMount(){
        if(window.dataManager.find('likedTrackIds', this.props.track.id)){
            this.setState({liked: true});
        }
    }

    toggleLike(){
        window.soundCloudAPI.toggleLikedTrack(this.props.track.id);
        window.messenger.publish('track-like', {
            id: this.props.track.id,
            liked: !this.state.liked
        });
    }

    toggleRepost(){
        window.soundCloudAPI.toggleRepostTrack(this.props.track.id);
    }

    render(){
        let likeText = 'Like';

        if(this.state.liked){
            likeText = 'Unlike';
        }


        return (
            <ul className="context-menu-list">
                <li className="list-item" onClick={this.toggleLike.bind(this)}>{likeText}</li>
                <li className="list-item" onClick={this.toggleRepost.bind(this)}>Repost</li>
                <li className="list-item">Add to playlist</li>
            </ul>
        );
    }
}

export default TrackMenu;