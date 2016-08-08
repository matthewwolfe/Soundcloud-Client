import React, { Component } from 'react';

import { ucFirst } from '../../core/utils';

import ListTrack from './listTrack.jsx';
import TopSection from '../top_50_section/topSection.jsx';
import Loader from '../loader.jsx';


class ListMusicList extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: false
        };
    }

    // Override
    render(){
        if(this.state.isLoading){
            return (
                <Loader />
            );
        }

        let topSection;

        if(this.props.selectedSection === 'top 50'){
            topSection = <TopSection />
        }

        return (
            <div id="music-list">
                <h2 className="section-title">{ucFirst(this.props.selectedSection)}</h2>

                {topSection}

                <table>
                    <tbody>
                        {
                            this.props.tracks.map((track, index) => {
                                return <ListTrack section={this.props.selectedSection} data={track} key={index} />;
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListMusicList;