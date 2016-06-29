import React from 'react';

class NotificationItem extends React.Component {

    constructor(props){
        super(props);
    }

    getDescription(){
        let description;

        if(this.props.data.type === 'track-like'){
            description = 'Liked ' + this.props.data.track.title;
        } else if(this.props.data.type === 'affiliation'){
            description = 'Is following you';
        }

        return description;
    }

    render(){
        let description = this.getDescription();

        return (
            <div className="notification-item">

                <div className="notification-image">
                    <img src={this.props.data.user.avatar_url} />
                </div>

                <div className="text-container">

                    <div className="notification-username">
                        {this.props.data.user.username}
                    </div>

                    <div className="notification-description">
                        {description}
                    </div>

                </div>
            </div>
        );
    }
}

export default NotificationItem;