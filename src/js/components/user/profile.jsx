import React, { PropTypes } from 'react';

import { pretty_number } from '../../core/utils';


const Profile = ({user}) => {

    return (
        <div id="profile">
            <div className="profile-picture">
                <img src={user.avatar_url} />
            </div>

            <div className="info-container">
                <h1 className="username">
                    {user.username}
                </h1>

                <div className="profile-location">
                    {user.location}
                </div>

                <div className="followers-count">
                    Followers: {pretty_number(user.followers_count)}
                </div>

                <div className="followings-count">
                    Following: {pretty_number(user.followings_count)}
                </div>

                <div className="description">
                    {user.description}
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    user: PropTypes.shape({
        avatar_url: PropTypes.string.required,
        username: PropTypes.string.required,
        location: PropTypes.string.required,
        followers_count: PropTypes.number.required,
        followings_count: PropTypes.number.required,
        description: PropTypes.string.required
    })
};

export default Profile;