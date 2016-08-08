import React from 'react';

import { convertDuration } from '../../core/utils';


const ListTrack = (props) => {
    let trackClass = 'track list';
    let likedClass = 'glyphicon glyphicon-heart';
    let downloadClass = 'glyphicon glyphicon-download-alt';
    let options = '';

    if(!props.data.streamable){
        downloadClass += ' hide';
    }

    if(props.data.type !== 'offline'){
        
        options = <td className="track-options">
                    <span className={likedClass}></span>
                    <span className={downloadClass}></span>
                  </td>
    }

    return (
        <tr className={trackClass} 
            id={props.data.id}>

            <td className="track-title">
                <p>{props.data.title}</p>
            </td>
            <td className="track-user-username">
                <p>{props.data.user.username}</p>
            </td>
            <td className="track-duration">
                <p>{convertDuration(props.data.duration)}</p>
            </td>

            {options}
        </tr>
    );
}

export default ListTrack;