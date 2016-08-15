import React from 'react';

import { connect } from 'react-redux';

import QueueItem from './queueItem.jsx';

class QueueList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hidden: true
        };
    }

    render(){
        let queueItems = [];

        for(var i = 0; i < this.props.queue.length; i++){
            queueItems.push(
                <QueueItem data={this.props.queue[i]}
                           key={i} queueOrder={i+1}/>
            );
        }

        return (
            <div id="queue-list" className={this.state.hidden ? 'hide' : ''}>
                {queueItems}
            </div>
        );
    }
}

const getQueueTracks = (queue, tracks) => {
    return queue.map((id) => tracks.filter((track) => track.id === id)[0]);
}

const mapStateToProps = (state) => {
    return {
        queue: getQueueTracks(state.queue, state.tracks)
    };
};

export default connect(
    mapStateToProps
)(QueueList);