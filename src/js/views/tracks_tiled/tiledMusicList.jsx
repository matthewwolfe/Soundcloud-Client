import React from 'react';

import MusicList from '../musicList.jsx';
import TiledTrack from './tiledTrack.jsx';

class TiledMusicList extends MusicList {

    constructor(props){
        super(props);
    }

    // Override
    render(){
        if(!this.state.isTiledView){
            return null;
        }

        var tracks = [];

        for(var i = 0; i < this.state.data.tracks.length; i++){
            tracks.push(<TiledTrack section={this.state.selected} data={this.state.data.tracks[i]} key={this.trackId} />);
            this.trackId++;
        }

        return (
            <div id="music-list">
                <h2 className="section-title">{this.ucFirst(this.state.selected)}</h2>

                {tracks}
            </div>
        );
    }
}

export default TiledMusicList;