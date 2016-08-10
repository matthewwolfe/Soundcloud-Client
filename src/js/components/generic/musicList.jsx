import React from 'react';

import ListMusicList from '../tracks_list/listMusicList.jsx';
import TiledMusicList from '../tracks_tiled/tiledMusicList.jsx';

class MusicList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.tracks !== prevProps.tracks){
            this.setState({isLoading: false});
        }
    }

    render () {
        let musicView = <ListMusicList tracks={this.props.tracks}
                                       selectedSection={this.props.selectedSection}
                                       toggleLikeTrack={this.props.toggleLikeTrack} />

        if(this.state.isTiledView){
            musicView = <TiledMusicList tracks={this.props.tracks}
                                        selectedSection={this.props.selectedSection}
                                        toggleLikeTrack={this.props.toggleLikeTrack} />
        }

        return musicView;
    }
}

export default MusicList;