import React from 'react';

import { store } from '../../index.jsx';
import { setQueue } from '../../actions/queue';

import ListMusicList from '../tracks_list/listMusicList.jsx';
import TiledMusicList from '../tracks_tiled/tiledMusicList.jsx';

class MusicList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState){
        return (this.props.tracks === nextProps.tracks) ? false : true;
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.tracks !== prevProps.tracks){
            this.setState({isLoading: false});

            let queue = [];
            this.props.tracks.forEach((track) => {
                queue.push(track.id);
            });

            // store.dispatch(setQueue(queue));
        }
    }

    render () {
        let musicView = <ListMusicList tracks={this.props.tracks}
                                       selectedSection={this.props.selectedSection}
                                       toggleLikeTrack={this.props.toggleLikeTrack}
                                       playTrack={this.props.playTrack}
                                       tracks={this.props.tracks} />

        if(this.state.isTiledView){
            musicView = <TiledMusicList tracks={this.props.tracks}
                                        selectedSection={this.props.selectedSection}
                                        toggleLikeTrack={this.props.toggleLikeTrack}
                                        playTrack={this.props.playTrack} />
        }

        return musicView;
    }
}

export default MusicList;