import React from 'react';

class SideMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            selected: 'stream'
        };

        this.getPlaylistNames();
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

    getPlaylistNames(){
        window.soundCloudAPI.getOwnedPlaylists(function(response){
            this.setState({playlists: response});
        }.bind(this));
    }

    render(){
        let playlists = [];

        if(this.state.playlists !== undefined){
            for(var i = 0; i < this.state.playlists.length; i++){
                playlists.push(
                    <li key={i} onClick={this.setActive.bind(this, 'playlist-' + this.state.playlists[i].playlist.id)}>
                        {this.state.playlists[i].playlist.title}
                    </li>
                );
            }
        }

        return (
            <div id="side-menu">
                <ul>
                    <li onClick={this.setActive.bind(this, 'top 50')} className={this.isActive('top 50')}>Top 50</li>
                    <li onClick={this.setActive.bind(this, 'stream')} className={this.isActive('stream')}>Stream</li>
                    <li onClick={this.setActive.bind(this, 'likes')} className={this.isActive('likes')}>Likes</li>
                    <li onClick={this.setActive.bind(this, 'tracks')} className={this.isActive('tracks')}>Tracks</li>
                    <br/>
                    <li>Playlists</li>
                    <ul className="playlists-menu">
                        {playlists}
                    </ul>
                </ul>
            </div>
        );
    }
}

export default SideMenu;