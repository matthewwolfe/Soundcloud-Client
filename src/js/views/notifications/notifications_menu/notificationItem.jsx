import React from 'react';

class NotificationItem extends React.Component {

    constructor(props){
        super(props);
    }

    getDescription(){
        let description = this.props.data.user.username;

        if(this.props.data.type === 'track-like'){
            description += ' liked ' + this.props.data.track.title;
        } else if(this.props.data.type === 'affiliation'){
            description += ' is following you';
        }

        return description;
    }

    render(){
        let description = this.getDescription();

        return (
            <div className="notification-item">
                {description}
            </div>
        );
    }
}

export default NotificationItem;