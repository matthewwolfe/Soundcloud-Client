import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getTracks } from '../actions/top50';
import { setSelectedSection } from '../actions/section';

import { getOwnedPlaylists as SC_getMyPlaylists } from '../core/soundcloud/soundCloudSDK';


class SideMenu extends Component {

    constructor(props){
        super(props);

        this.state = {
            data: {},
            selected: 'stream'
        };
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.selected !== this.state.selected){
            this.props.handleClick(this.state.selected);
        }
    }

    isActive(value){
        return ((value === this.state.selected) ? 'active' : '');
    }

    setActive(value){
        this.setState({selected: value});
    }

    render(){
        let playlists = [];

        if(this.props.playlists !== undefined){
            for(var i = 0; i < this.props.playlists.length; i++){
                playlists.push(
                    <li key={i} 
                        onClick={this.setActive.bind(this, 'playlist-' + this.props.playlists[i].id)}
                        className={'playlist ' + this.isActive('playlist-' + this.props.playlists[i].id)}>
                        
                        <span className="glyphicon glyphicon-tags"></span>
                        {this.props.playlists[i].title}
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

const getOwnedPlaylists = (playlists, myPlaylists) => {
    return playlists.filter((playlist) => myPlaylists.indexOf(playlist.id) !== -1);
};

const mapStateToProps = (state) => {
    return {
        playlists: getOwnedPlaylists(state.playlists, state.myPlaylists)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick: (data) => {
            if(data === 'top 50'){
                getTracks();
            }

            dispatch(setSelectedSection(data));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenu);