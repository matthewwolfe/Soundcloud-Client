import { connect } from 'react-redux';

import MusicList from '../components/generic/musicList.jsx';


const getVisibleTracks = (states, section) => {
    let tracks = [];

    switch(section){

        case 'stream':
            return states.stream;

        case 'likes':
            states.likedTrackIds.forEach((track_id) => {
                let track = states.tracks.filter((track) => track.id === track_id);
                if(track.length === 1){
                    tracks.push(track[0]);
                }
            });
            return tracks;

        case 'tracks':
            states.myTracks.forEach((track_id) => {
                let track = states.tracks.filter((track) => track.id === track_id);
                if(track.length === 1){
                    tracks.push(track[0]);
                }
            });
            return tracks;
    }
};

const mapStateToProps = (state) => {
    return {
        tracks: getVisibleTracks({
                tracks: state.tracks,
                stream: state.stream,
                likedTrackIds: state.likedTrackIds,
                myTracks: state.myTracks
            },
            state.section.selectedSection
        ),
        selectedSection: state.section.selectedSection
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const VisibleMusicList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicList);

export default VisibleMusicList;