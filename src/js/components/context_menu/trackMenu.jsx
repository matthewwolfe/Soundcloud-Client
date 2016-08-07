import React from 'react';

class TrackMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            liked: false,
            reposted: false
        };

        window.messenger.subscribe('track-like', function(data){
            if(data.id === this.props.track.id){
                this.setState({liked: data.liked});
            }
        }.bind(this));

        window.messenger.subscribe('track-repost', function(data){
            if(data.id === this.props.track.id){
                this.setState({reposted: data.reposted});
            }
        }.bind(this));
    }

    componentWillMount(){
        if(window.dataManager.find('likedTrackIds', this.props.track.id)){
            this.setState({liked: true});
        }

        if(window.dataManager.find('trackRepostIds', this.props.track.id)){
            this.setState({reposted: true});
        }
    }

    toggleLike(){
        window.soundCloudAPI.toggleLikedTrack(this.props.track.id);
        window.messenger.publish('track-like', {
            id: this.props.track.id,
            liked: !this.state.liked
        });

        this.closeMenu();
    }

    toggleRepost(){
        window.soundCloudAPI.toggleRepostTrack(this.props.track.id);
        window.messenger.publish('track-repost', {
            id: this.props.track.id,
            reposted: !this.state.reposted
        });

        this.closeMenu();
    }

    openInBrowser(){
        node.electron.shell.openExternal(this.props.track.permalink_url);
    }

    closeMenu(){
        window.messenger.publish('context-menu-close', {});
    }

    render(){
        let likeText = 'Like';
        let repostText = 'Repost';

        if(this.state.liked){
            likeText = 'Unlike';
        }

        if(this.state.reposted){
            repostText = 'Unpost';
        }

        return (
            <ul className="context-menu-list">

                <li className="list-item" onClick={this.toggleLike.bind(this)}>
                    {likeText}
                </li>

                <li className="list-item" onClick={this.toggleRepost.bind(this)}>
                    {repostText}
                </li>

                <li className="list-item">
                    Add to playlist
                </li>

                <li className="list-item" onClick={this.openInBrowser.bind(this)}>
                    View on Soundcloud
                </li>
            </ul>
        );
    }
}

export default TrackMenu;