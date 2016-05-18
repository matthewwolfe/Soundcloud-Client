import React from 'react';

class SideMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            selected: 'stream'
        };
    }

    isActive(value){
        return ((value === this.state.selected) ? 'active' : '');
    }

    setActive(value){
        this.setState({selected: value});

        window.messenger.publish('side-menu-click', {
            selected: value
        });
    }

    render () {
        return (
            <div id="side-menu">
                <ul>
                    <li onClick={this.setActive.bind(this, 'stream')} className={this.isActive('stream')}>Stream</li>
                    <li onClick={this.setActive.bind(this, 'likes')} className={this.isActive('likes')}>Likes</li>
                    <li onClick={this.setActive.bind(this, 'tracks')} className={this.isActive('tracks')}>Tracks</li>
                    <li onClick={this.setActive.bind(this, 'playlists')} className={this.isActive('playlists')}>Playlists</li>
                </ul>
            </div>
        );
    }
}

export default SideMenu;