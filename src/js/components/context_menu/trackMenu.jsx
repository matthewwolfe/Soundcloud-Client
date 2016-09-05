import React from 'react';
import { connect } from 'react-redux';

import { toggleLikeTrack } from '../../actions/likedTrackIds';

import { node } from '../../core/soundcloud/config';


const TrackMenu = (props) => {

    let likeText = 'Like';
    let repostText = 'Repost';

    if(props.track.liked){
        likeText = 'Unlike';
    }

    if(props.track.reposted){
        repostText = 'Unpost';
    }

    return (
        <ul className="context-menu-list">

            <li className="list-item" onClick={(e) => {
                    props.toggleLiked(props.track.id, props.track.liked);
                    props.hide();
                }}>
                {likeText}
            </li>

            <li className="list-item" onClick={(e) => {
                    props.hide();
                }}>
                {repostText}
            </li>

            <li className="list-item" onClick={(e) => {
                    props.hide();
                }}>

                Add to playlist
            </li>

            <li className="list-item" onClick={(e) => {
                    props.hide();
                }}>

                Add to queue
            </li>

            <li className="list-item" onClick={() => {
                    node.electron.shell.openExternal(props.track.permalink_url);
                    props.hide();
                }}>

                View on Soundcloud
            </li>
        </ul>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLiked: (id, liked) => {
            dispatch(toggleLikeTrack(id, liked));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(TrackMenu);