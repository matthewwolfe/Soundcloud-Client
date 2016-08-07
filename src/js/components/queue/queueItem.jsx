import React from 'react';
import ReactDOM from 'react-dom';

class QueueItem extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            playing: false,
            hidden: false
        }
    }

    removeFromQueue(){
        window.music.removeFromQueue(this.props.data.id, (this.props.queueOrder - 1));
    }

    render(){
        return (
            <div className="queue-item">
                <div className="order">
                    {this.props.queueOrder}
                </div>

                <span className="remove-icon glyphicon glyphicon-remove"
                      onClick={this.removeFromQueue.bind(this)}></span>

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