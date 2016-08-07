import React from 'react';

import NotificationItem from './notificationItem.jsx';

class NotificationsMenu extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hidden: true,
            notifications: []
        };
    }

    toggleHidden(){
        this.setState({hidden: !this.state.hidden}, function(){
            if(!this.state.hidden){
                this.getNotifications();
            }
        }.bind(this));
    }

    getNotifications(){
        window.soundCloudAPI.getNotifications(function(notifications){
            this.setState({notifications: notifications});
        }.bind(this));
    }

    render(){
        let notificationItems = [];

        for(let i = 0; i < this.state.notifications.length; i++){
            notificationItems.push(<NotificationItem data={this.state.notifications[i]} key={i} />);
        }

        return (
            <span className="notifications-menu-container">

                <span className="glyphicon glyphicon-bell" id="notifications-button"
                      onClick={this.toggleHidden.bind(this)}>

                </span>

                <div id="notifications-menu" className={this.state.hidden ? 'hide' : ''}>
                    {notificationItems}
                </div>
            </span>
        );
    }
}

export default NotificationsMenu;