import { connect } from 'react-redux';

import { toggleLikeTrack } from '../actions/likedTrackIds';
import { playTrack } from '../actions/player';
import { setQueue } from '../actions/queue';

import MusicList from '../components/generic/musicList.jsx';


const getVisibleTracks = (states, section) => {
    let tracks = [];

    if(section.indexOf('playlist-') !== -1){
        return getPlaylistTracks(section, states);
    }

    switch(section){

        case 'search':
            states.search.forEach((track_id) => {
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

        case 'top 50':
            states.top50.forEach((track_id) => {
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

        case 'stream':
            states.stream.forEach((track_id) => {
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

const getPlaylistTracks = (section, states) => {
    let id = parseInt(section.substring(9));
    let playlist = states.playlists.filter((playlist) => playlist.id === id)[0];

    return playlist.tracks;
};

const getSectionName = (playlists, section) => {
    if(section.indexOf('playlist-') === -1){
        return section;
    }

    let id = parseInt(section.substring(9));
    let playlist = playlists.filter((playlist) => playlist.id === id)[0];
    return playlist.title;
}

const mapStateToProps = (state) => {
    return {
        tracks: getVisibleTracks(
            {
                tracks: state.tracks,
                stream: state.stream,
                likedTrackIds: state.likedTrackIds,
                myTracks: state.myTracks,
                top50: state.top50.top50,
                search: state.search,
                myPlaylists: state.myPlaylists,
                likedPlaylists: state.likedPlaylists,
                playlists: state.playlists
            },
            state.section.selectedSection
        ),
        selectedSection: getSectionName(state.playlists, state.section.selectedSection),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLikeTrack: (id, liked) => {
            dispatch(toggleLikeTrack(id, liked));
        },
        playTrack: (id, index, tracks) => {
            dispatch(playTrack(id));

            let queue = tracks.slice(index).map((track) => track.id);
            dispatch(setQueue(queue));
        }
    };
};

const VisibleMusicList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicList);

export default VisibleMusicList;