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

    // Override
    render(){
        return (
            <div className="track-container" id={this.props.data.id}>

                <div className="track-image">
                    <img src={this.getArtworkUrl()} />
                </div>

                <div className="track-title">
                    <h4>{this.props.data.title}</h4>
                </div>
            </div>
        );
    }
}

export default TiledTrack;