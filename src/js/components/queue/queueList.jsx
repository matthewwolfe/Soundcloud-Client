import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import QueueItem from './queueItem.jsx';

const QueueList = (props) => {
    let queueItems = [];

    for(var i = 0; i < props.queue.length; i++){
        queueItems.push(
            <QueueItem data={props.queue[i]}
                       key={i} queueOrder={i+1}/>
        );
    }

    return (
        <div id="queue-list" className={props.hidden ? 'hide' : ''}>
            {queueItems}
        </div>
    );
};

QueueList.propTypes = {
    queue: PropTypes.array.isRequired,
    hidden: PropTypes.bool.isRequired
};

const getQueueTracks = (queue, tracks) => {
    return queue.map((id) => tracks.filter((track) => track.id === id)[0]);
};

const mapStateToProps = (state) => {
    return {
        queue: getQueueTracks(state.queue.queue, state.tracks),
        hidden: state.queue.hidden
    };
};

export default connect(
    mapStateToProps
)(QueueList);
