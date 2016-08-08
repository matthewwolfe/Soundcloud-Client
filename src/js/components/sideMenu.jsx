import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setSelectedSection } from '../actions/section';

import { getOwnedPlaylists as SC_getMyPlaylists } from '../core/soundcloud/soundCloudSDK';


let selectedSectionHandler = (dispatch) => {
    let onClick = (data) => {
        dispatch(setSelectedSection(data));
    }

    return onClick;
};


class SideMenu extends Component {

    constructor(props){
        super(props);

        this.handleClick = selectedSectionHandler(this.props.dispatch);

        this.state = {
            data: {},
            selected: 'stream',
            playlists: []
        };

        this.getPlaylistNames();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.selected !== this.state.selected){
            this.handleClick(this.state.selected);
        }
    }

    isActive(value){
        return ((value === this.state.selected) ? 'active' : '');
    }

    setActive(value){
        this.setState({selected: value});
    }

    getPlaylistNames(){
        SC_getMyPlaylists(function(playlists){
            this.setState({playlists: playlists});
        }.bind(this));
    }

    render(){
        let playlists = [];

        if(this.state.playlists !== undefined){
            for(var i = 0; i < this.state.playlists.length; i++){
                playlists.push(
                    <li key={i} 
                        onClick={this.setActive.bind(this, 'playlist-' + this.state.playlists[i].playlist.id)}
                        className={'playlist ' + this.isActive('playlist-' + this.state.playlists[i].playlist.id)}>
                        
                        <span className="glyphicon glyphicon-tags"></span>
                        {this.state.playlists[i].playlist.title}
                    </li>
                );
            }
        }

        return (
            <div id="side-menu">
                <ul>
                    <li onClick={this.setActive.bind(this, 'top 50')} className={this.isActive('top 50')}>
                        <span className="glyphicon glyphicon-star"></span>
                        Top 50
                    </li>
                    
                    <li onClick={this.setActive.bind(this, 'stream')} className={this.isActive('stream')}>
                        <span className="glyphicon glyphicon-cloud"></span>
                        Stream
                    </li>
                    
                    <li onClick={this.setActive.bind(this, 'likes')} className={this.isActive('likes')}>
                        <span className="glyphicon glyphicon-heart"></span>
                        Likes
                    </li>
                    
                    <li onClick={this.setActive.bind(this, 'tracks')} className={this.isActive('tracks')}>
                        <span className="glyphicon glyphicon-music"></span>
                        Tracks
                    </li>

                    <li onClick={this.setActive.bind(this, 'offline')} className={this.isActive('offline')}>
                        <span className="glyphicon glyphicon-download-alt"></span>
                        Offline
                    </li>
                    
                    <br/>
                    
                    {playlists}
                </ul>
            </div>
        );
    }
}

export default connect()(SideMenu);