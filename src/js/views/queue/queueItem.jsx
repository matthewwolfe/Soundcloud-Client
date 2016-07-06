import React from 'react';

class QueueItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            playing: false
        }
    }

    render(){
        return (
            <div className="queue-item">
                <div className="order">
                    {this.props.queueOrder}
                </div>

                <div className="title">
                    {this.props.data.title}
                </div>

                <div className="username">
                    {this.props.data.user.username}
                </div>
            </div>
        );
    }
}

export default QueueItem;