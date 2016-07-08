import React from 'react';

import Track from '../track.jsx';

class TiledTrack extends Track {

    constructor(props){
        super(props);
    }

    getArtworkUrl(){
        if(this.props.data.artwork_url){
            return this.props.data.artwork_url.replace('large', 't300x300');
        } else {
            return '';
        }

    }

    openInBrowser(){
        electron.shell.openExternal(this.props.data.permalink_url);
    }

    // Override
    render(){
        let trackClass = 'track tiled';
        let likedClass = 'glyphicon glyphicon-heart';
        let downloadClass = 'glyphicon glyphicon-download-alt';

        if(this.state.playing){
            trackClass += ' playing';
        }

        if(this.state.liked){
            likedClass += ' liked';
        }

        if(!this.props.data.streamable){
            downloadClass += ' hide';
        }

        return (
            <div className={trackClass}
                 id={this.props.data.id}
                 onContextMenu={this.contextMenu.bind(this)}>

                <div className="track-image"
                     onDoubleClick={this.playTrack.bind(this, this.props)}>
                    
                    <div className="track-genre-tag">
                        {this.props.data.genre}
                    </div>

                    <img src={this.getArtworkUrl()} />
                </div>

                <div className="track-title">
                    <h4>{this.props.data.title}</h4>
                </div>

                <div className="track-options">
                    <span onClick={this.toggleLikedTrack.bind(this)} className={likedClass}></span>
                    <span className="glyphicon glyphicon-retweet"></span>
                    <span className="glyphicon glyphicon-tags"></span>
                    <span onClick={this.openInBrowser.bind(this)} className="glyphicon glyphicon-share" ></span>
                    <span onClick={this.downloadTrack.bind(this)} className={downloadClass}></span>
                </div>
            </div>
        );
    }
}

export default TiledTrack;