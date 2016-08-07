import React from 'react';

import { getNotifications as SC_getNotifications } from '../../../core/soundcloud/soundCloudSDK';

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
        SC_getNotifications(function(notifications){
            this.setState({notifications: notifications});
        }.bind(this));
    }

    render(){
        return (
            <span className="notifications-menu-container">

                <span className="glyphicon glyphicon-bell" id="notifications-button"
                      onClick={this.toggleHidden.bind(this)}>

                </span>

                <div id="notifications-menu" className={this.state.hidden ? 'hide' : ''}>
                    {this.state.notifications.map((notification, index) =>
                        <NotificationItem notification={notification} key={index} />
                    )}
                </div>
            </span>
        );
    }
}

export default NotificationsMenu;