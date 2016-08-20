import React from 'react';

const QueueItem = (props) => {
    return (
        <div className="queue-item">
            <div className="order">
                {props.queueOrder}
            </div>

            <span className="remove-icon glyphicon glyphicon-remove"
                  onClick={props.removeFromQueue.bind(this, props.data.id, props.queueOrder - 1)}>
            </span>

            <div className="title">
                {props.data.title}
            </div>

            <div className="username">
                {props.data.user.username}
            </div>
        </div>
    );
};

export default QueueItem;