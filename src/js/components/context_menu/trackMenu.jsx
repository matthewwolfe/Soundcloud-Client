import React from 'react';

import { node } from '../../core/soundcloud/config';


const TrackMenu = (props) => {

    console.log(props);

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

            <li className="list-item">
                {likeText}
            </li>

            <li className="list-item">
                {repostText}
            </li>

            <li className="list-item">
                Add to playlist
            </li>

            <li className="list-item" onClick={() => (node.electron.shell.openExternal(props.track.permalink_url))}>
                View on Soundcloud
            </li>
        </ul>
    );
}

export default TrackMenu;