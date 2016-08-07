import React from 'react';

import QueueItem from './queueItem.jsx';

class QueueList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            queue: [],
            isQueueShowing: false
        };
    }

    render(){
        let queueItems = [];

        for(var i = 0; i < this.state.queue.length; i++){
            queueItems.push(
                <QueueItem data={this.state.queue[i]}
                           key={i} queueOrder={i+1}/>
            );
        }

        return (
            <div id="queue-list" className={!this.state.isQueueShowing ? 'hide' : ''}>
                {queueItems}
            </div>
        );
    }
}

export default QueueList;