import React from 'react';

import MusicList from '../musicList.jsx';
import ListTrack from './listTrack.jsx';

class ListMusicList extends MusicList {

    constructor(props){
        super(props);
    }

    // Override
    render(){
        if(this.state.isTiledView){
            return null;
        }

        var tracks = [];

        for(var i = 0; i < this.state.data.tracks.length; i++){
            tracks.push(<ListTrack section={this.state.selected} data={this.state.data.tracks[i]} key={this.trackId} />);
            this.trackId++;
        }

        return (
            <div id="music-list">
                <h2 className="section-title">{this.ucFirst(this.state.selected)}</h2>

                <table>
                    <tbody>
                        {tracks}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListMusicList;