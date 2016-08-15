import { connect } from 'react-redux';

import { toggleLikeTrack } from '../actions/likedTrackIds';
import { playTrack } from '../actions/player';

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
                    track[0].liked = true;
                    tracks.push(track[0]);
                }
            });
            return tracks;

        case 'tracks':
            states.myTracks.forEach((track_id) => {
                let track = states.tracks.filter((track) => track.id === track_id);
                if(track.length === 1){
                    if(states.likedTrackIds.indexOf(track[0].id) !== -1){
                        track[0].liked = true;
                    } else {
                        track[0].liked = false;
                    }
                    tracks.push(track[0]);
                }
            });
            return tracks;
    }
};

const mapStateToProps = (state) => {
    return {
        tracks: getVisibleTracks(
            {
                tracks: state.tracks,
                stream: state.stream,
                likedTrackIds: state.likedTrackIds,
                myTracks: state.myTracks
            },
            state.section.selectedSection
        ),
        selectedSection: state.section.selectedSection,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLikeTrack: (id, liked) => {
            dispatch(toggleLikeTrack(id, liked));
        },
        playTrack: (id, event) => {
            let index = Array.from(
                document.querySelectorAll('#music-list .track')
            ).indexOf(event.target.closest('.track'));
            
            dispatch(playTrack(id, index));
        }
    };
};

const VisibleMusicList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicList);

export default VisibleMusicList;