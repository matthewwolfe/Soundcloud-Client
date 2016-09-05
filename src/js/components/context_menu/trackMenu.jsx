import React from 'react';

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

export default TrackMenu;