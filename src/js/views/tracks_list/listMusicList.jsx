import React from 'react';

import MusicList from '../generic/musicList.jsx';
import ListTrack from './listTrack.jsx';

import TopSection from '../top_50_section/topSection.jsx';

import Loader from '../loader.jsx';

class ListMusicList extends MusicList {

    constructor(props){
        super(props);
    }

    // Override
    render(){
        if(this.state.isLoading){
            return (
                <Loader />
            );
        }

        let topSection;

        if(this.state.selected === 'top 50'){
            topSection = <TopSection />
        }

        var tracks = [];

        for(var i = 0; i < this.state.data.tracks.length; i++){
            tracks.push(<ListTrack section={this.state.selected} data={this.state.data.tracks[i]} key={this.trackId} />);
            this.trackId++;
        }

        return (
            <div id="music-list" onScroll={this.handleScroll.bind(this)}>
                <h2 className="section-title">{this.ucFirst(this.state.selected)}</h2>

                {topSection}

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