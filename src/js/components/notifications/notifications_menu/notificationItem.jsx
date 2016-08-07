import React from 'react';

const NotificationItem = ({ notification }) => {

    let description = getDescription(notification);

    return (
        <div className="notification-item">

            <div className="notification-image">
                <img src={notification.user.avatar_url} />
            </div>

            <div className="text-container">

                <div className="notification-username">
                    {notification.user.username}
                </div>

                <div className="notification-description">
                    {description}
                </div>

            </div>
        </div>
    );
};

function getDescription(notification){
    let description;

    if(notification.type === 'track-like'){
        description = 'Liked ' + notification.track.title;
    } else if(notification.type === 'affiliation'){
        description = 'Is following you';
    }

    return description;
}

export default NotificationItem;